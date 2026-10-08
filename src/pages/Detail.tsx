import React, { useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  getFactDetails,
  getMonumentDetails,
  getPersonDetails,
  getPlaceDetails,
  toggleFactFavorite,
  toggleMonumentFavorite,
  togglePersonFavorite,
  togglePlaceFavorite,
} from '../store/slices/wikimediaSlice';
import { ArrowLeft, Star, MapPin, Calendar, User as UserIcon } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Loading from '../components/Loading';

const Detail: React.FC = () => {
  const { type, pageId } = useParams<{ type: string; pageId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    currentFact,
    currentMonument,
    currentPerson,
    currentPlace,
    loading,
  } = useAppSelector((state) => state.wikimedia);

  useEffect(() => {
    console.log('Detail page loaded with:', { type, pageId });
    
    if (!type || !pageId) {
      console.error('Missing type or pageId');
      return;
    }

    console.log('Fetching details for:', type, pageId);

    switch (type) {
      case 'facts':
        dispatch(getFactDetails(pageId));
        break;
      case 'monuments':
        dispatch(getMonumentDetails(pageId));
        break;
      case 'persons':
        dispatch(getPersonDetails(pageId));
        break;
      case 'places':
        dispatch(getPlaceDetails(pageId));
        break;
      default:
        console.error('Unknown type:', type);
    }
  }, [type, pageId, dispatch]);

  const getCurrentItem = () => {
    switch (type) {
      case 'facts':
        return currentFact;
      case 'monuments':
        return currentMonument;
      case 'persons':
        return currentPerson;
      case 'places':
        return currentPlace;
      default:
        return null;
    }
  };

  const item = getCurrentItem();

  const toggleFavorite = useCallback(() => {
    if (!type || !pageId) return;

    switch (type) {
      case 'facts':
        dispatch(toggleFactFavorite(pageId));
        break;
      case 'monuments':
        dispatch(toggleMonumentFavorite(pageId));
        break;
      case 'persons':
        dispatch(togglePersonFavorite(pageId));
        break;
      case 'places':
        dispatch(togglePlaceFavorite(pageId));
        break;
    }
  }, [type, pageId, dispatch]);

  const renderMetadata = () => {
    if (!item) return null;

    const metadata: Array<{ icon: React.ElementType; label: string; value: string }> = [];

    switch (type) {
      case 'facts':
        if ((item as any).date) metadata.push({ icon: Calendar, label: 'Date', value: (item as any).date });
        if ((item as any).location) metadata.push({ icon: MapPin, label: 'Lieu', value: (item as any).location });
        break;
      case 'monuments':
        if ((item as any).location) metadata.push({ icon: MapPin, label: 'Lieu', value: (item as any).location });
        if ((item as any).yearBuilt) metadata.push({ icon: Calendar, label: 'Année de construction', value: (item as any).yearBuilt });
        break;
      case 'persons':
        if ((item as any).birthDate) metadata.push({ icon: Calendar, label: 'Date de naissance', value: (item as any).birthDate });
        if ((item as any).deathDate) metadata.push({ icon: Calendar, label: 'Date de décès', value: (item as any).deathDate });
        if ((item as any).occupation) metadata.push({ icon: UserIcon, label: 'Profession', value: (item as any).occupation });
        if ((item as any).nationality) metadata.push({ icon: MapPin, label: 'Nationalité', value: (item as any).nationality });
        break;
      case 'places':
        if ((item as any).country) metadata.push({ icon: MapPin, label: 'Pays', value: (item as any).country });
        if ((item as any).population) metadata.push({ icon: UserIcon, label: 'Population', value: (item as any).population.toString() });
        break;
    }

    return metadata;
  };

  const metadata = renderMetadata();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Sidebar />
        <div className="ml-64">
          <Loading message="Chargement des détails..." />
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-2">Élément non trouvé</p>
          <p className="text-sm text-gray-500 mb-4">Type : {type} | PageId : {pageId}</p>
          <button
            onClick={() => navigate('/explore')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Retour à l'exploration
          </button>
        </div>
      </div>
    );
  }

  const thumbnailUrl = item.thumbnailUrl || item.thumbnail;
  const fullUrl = item.fullUrl || item.url;
  const extractText = item.extract || item.description;

  // Format coordinates string if present
  const getFormattedCoordinates = () => {
    const coords = item.coordinates as any;
    if (!coords) return null;
    if (Array.isArray(coords) && coords.length >= 2) {
      return `${coords[0]}, ${coords[1]}`;
    }
    if (typeof coords === 'object' && coords.lat !== undefined && coords.lon !== undefined) {
      return `${coords.lat}, ${coords.lon}`;
    }
    return null;
  };

  const formattedCoordinates = getFormattedCoordinates();

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      {/* Header */}
      <div className="bg-white shadow-sm ml-64">
        <div className="px-6 py-4">
          <button
            onClick={() => navigate('/explore')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour à l'exploration
          </button>
        </div>
      </div>

      <div className="px-6 py-8 ml-64 max-w-7xl">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Image */}
          {thumbnailUrl && (
            <div className="w-full h-64 md:h-96 bg-gray-200">
              <img
                src={thumbnailUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
                {item.category && (
                  <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full mb-3 capitalize">
                    {item.category}
                  </span>
                )}
              </div>
              <button
                onClick={toggleFavorite}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  item.isFavorite
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Star
                  className={`w-5 h-5 mr-2 ${item.isFavorite ? 'fill-current' : ''}`}
                />
                {item.isFavorite ? 'Sauvegardé' : 'Sauvegarder'}
              </button>
            </div>

            {/* Extract / Description Details */}
            {extractText && (
              <div className="mb-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Détails</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base">
                  {extractText}
                </p>
              </div>
            )}

            {/* Metadata */}
            {metadata && metadata.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {metadata.map((meta, index) => {
                  const Icon = meta.icon;
                  return (
                    <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <Icon className="w-5 h-5 text-indigo-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">{meta.label}</p>
                        <p className="font-medium text-gray-900">{meta.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Coordinates */}
            {formattedCoordinates && (
              <div className="flex items-center p-4 bg-gray-50 rounded-lg mb-6">
                <MapPin className="w-5 h-5 text-indigo-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Coordonnées</p>
                  <p className="font-medium text-gray-900">{formattedCoordinates}</p>
                </div>
              </div>
            )}

            {/* URL */}
            {fullUrl && (
              <div className="mt-6">
                <a
                  href={fullUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Voir sur Wikipedia
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;