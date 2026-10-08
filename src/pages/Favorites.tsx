import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAllFavorites } from '../store/slices/wikimediaSlice';
import { Star, Clock, Landmark, User as UserIcon, MapPin } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Loading from '../components/Loading';

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { favorites, loading } = useAppSelector((state) => state.wikimedia);

  useEffect(() => {
    dispatch(getAllFavorites());
  }, [dispatch]);

  const handleItemClick = (pageId: string, type: string) => {
    navigate(`/explore/${type}/${pageId}`);
  };

  const favoritesCount = 
    (favorites?.facts?.length || 0) +
    (favorites?.monuments?.length || 0) +
    (favorites?.persons?.length || 0) +
    (favorites?.places?.length || 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Sidebar />
        <div className="ml-64">
          <Loading message="Chargement des favoris..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      {/* Header */}
      <div className="bg-white shadow-sm ml-64">
        <div className="px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Mes favoris</h1>
          <p className="mt-2 text-gray-600">
            {favoritesCount > 0 
              ? `Vous avez ${favoritesCount} éléments sauvegardés`
              : 'Commencez à explorer et sauvegardez vos éléments préférés'
            }
          </p>
        </div>
      </div>

      <div className="px-6 py-8 ml-64 max-w-7xl">
        {favoritesCount === 0 ? (
          <div className="text-center py-12">
            <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucun favori pour le moment</p>
            <button
              onClick={() => navigate('/explore')}
              className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Commencer l'exploration
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Facts */}
            {favorites?.facts && favorites.facts.length > 0 && (
              <section>
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-indigo-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Faits historiques</h2>
                  <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                    {favorites.facts.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favorites.facts.map((item) => (
                    <div
                      key={item.pageId}
                      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
                      onClick={() => handleItemClick(item.pageId, 'facts')}
                    >
                      {(item.thumbnailUrl || item.thumbnail) && (
                        <img
                          src={item.thumbnailUrl || item.thumbnail}
                          alt={item.title}
                          className="w-full h-32 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                        {(item.extract || item.description) && (
                          <p className="text-sm text-gray-600 line-clamp-2">{item.extract || item.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Monuments */}
            {favorites?.monuments && favorites.monuments.length > 0 && (
              <section>
                <div className="flex items-center mb-4">
                  <Landmark className="w-6 h-6 text-indigo-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Monuments</h2>
                  <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                    {favorites.monuments.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favorites.monuments.map((item) => (
                    <div
                      key={item.pageId}
                      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
                      onClick={() => handleItemClick(item.pageId, 'monuments')}
                    >
                      {(item.thumbnailUrl || item.thumbnail) && (
                        <img
                          src={item.thumbnailUrl || item.thumbnail}
                          alt={item.title}
                          className="w-full h-32 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                        {(item.extract || item.description) && (
                          <p className="text-sm text-gray-600 line-clamp-2">{item.extract || item.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Persons */}
            {favorites?.persons && favorites.persons.length > 0 && (
              <section>
                <div className="flex items-center mb-4">
                  <UserIcon className="w-6 h-6 text-indigo-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Personnes</h2>
                  <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                    {favorites.persons.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favorites.persons.map((item) => (
                    <div
                      key={item.pageId}
                      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
                      onClick={() => handleItemClick(item.pageId, 'persons')}
                    >
                      {(item.thumbnailUrl || item.thumbnail) && (
                        <img
                          src={item.thumbnailUrl || item.thumbnail}
                          alt={item.title}
                          className="w-full h-32 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                        {(item.extract || item.description) && (
                          <p className="text-sm text-gray-600 line-clamp-2">{item.extract || item.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Places */}
            {favorites?.places && favorites.places.length > 0 && (
              <section>
                <div className="flex items-center mb-4">
                  <MapPin className="w-6 h-6 text-indigo-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Lieux</h2>
                  <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                    {favorites.places.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favorites.places.map((item) => (
                    <div
                      key={item.pageId}
                      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
                      onClick={() => handleItemClick(item.pageId, 'places')}
                    >
                      {(item.thumbnailUrl || item.thumbnail) && (
                        <img
                          src={item.thumbnailUrl || item.thumbnail}
                          alt={item.title}
                          className="w-full h-32 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                        {(item.extract || item.description) && (
                          <p className="text-sm text-gray-600 line-clamp-2">{item.extract || item.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;