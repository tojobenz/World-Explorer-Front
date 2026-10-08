import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  searchFacts,
  searchMonuments,
  searchPersons,
  searchPlaces,
  setSearchQuery,
  setSearchType,
  clearResults,
  clearError,
} from '../store/slices/wikimediaSlice';
import { Search, Star, MapPin, User, Landmark, Clock } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const Explore: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    facts,
    monuments,
    persons,
    places,
    loading,
    error,
    searchQuery,
    searchType,
  } = useAppSelector((state) => state.wikimedia);

  const [localQuery, setLocalQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Sync local query with Redux
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      dispatch(setSearchQuery(localQuery));
      dispatch(clearError());
      setHasSearched(true);

      if (!localQuery.trim()) return;

      switch (searchType) {
        case 'facts':
          dispatch(searchFacts({ query: localQuery }));
          break;
        case 'monuments':
          dispatch(searchMonuments({ query: localQuery }));
          break;
        case 'persons':
          dispatch(searchPersons({ query: localQuery }));
          break;
        case 'places':
          dispatch(searchPlaces({ query: localQuery }));
          break;
      }
    },
    [localQuery, searchType, dispatch]
  );

  const handleTypeChange = (type: 'facts' | 'monuments' | 'persons' | 'places') => {
    dispatch(setSearchType(type));
    dispatch(clearResults());
  };

  const handleItemClick = (pageId: string, type: string) => {
    navigate(`/explore/${type}/${pageId}`);
  };

  const toggleFavorite = useCallback(
    async (pageId: string, type: string) => {
      // Implement toggle favorite logic
      console.log('Toggle favorite:', pageId, type);
    },
    []
  );

  const tabs = [
    { id: 'facts', label: 'Historical Facts', icon: Clock },
    { id: 'monuments', label: 'Monuments', icon: Landmark },
    { id: 'persons', label: 'People', icon: User },
    { id: 'places', label: 'Places', icon: MapPin },
  ];

  const getResults = () => {
    switch (searchType) {
      case 'facts':
        return facts;
      case 'monuments':
        return monuments;
      case 'persons':
        return persons;
      case 'places':
        return places;
      default:
        return [];
    }
  };

  const results = getResults();

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      {/* Header */}
      <div className="bg-white shadow-sm ml-64">
        <div className="px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Explore the World</h1>
          <p className="mt-2 text-gray-600">Discover historical facts, monuments, people, and places</p>
        </div>
      </div>

      <div className="px-6 py-8 ml-64 max-w-7xl">
        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="Search for facts, monuments, people, or places..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTypeChange(tab.id as any)}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    searchType === tab.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Results */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((item: any) => (
              <div
                key={item.pageId}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
                onClick={() => handleItemClick(item.pageId, searchType)}
              >
                {(item.thumbnailUrl || item.thumbnail) && (
                  <img
                    src={item.thumbnailUrl || item.thumbnail}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  {(item.extract || item.description) && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.extract || item.description}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item.pageId, searchType);
                      }}
                      className={`flex items-center px-3 py-1.5 rounded-lg transition-colors ${
                        item.isFavorite
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Star
                        className={`w-4 h-4 mr-1 ${item.isFavorite ? 'fill-current' : ''}`}
                      />
                      {item.isFavorite ? 'Saved' : 'Save'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : !loading && hasSearched && localQuery ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No results found for "{localQuery}"</p>
          </div>
        ) : !loading ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Start by searching for something</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Explore;