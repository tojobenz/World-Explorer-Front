import axios from 'axios';
import type {
  WikimediaSearchRequest,
  WikimediaSearchResponse,
  WikimediaDetailResponse,
  ToggleFavoriteResponse,
  FavoritesResponse,
  WikimediaFact,
  WikimediaMonument,
  WikimediaPerson,
  WikimediaPlace,
} from '../types/wikimedia';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5191/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor pour ajouter le token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const wikimediaApi = {
  // FACTS
  searchFacts: async (request: WikimediaSearchRequest): Promise<WikimediaSearchResponse<WikimediaFact>> => {
    const response = await api.post<WikimediaSearchResponse<WikimediaFact>>('/WikimediaFact/search', request);
    return response.data;
  },

  getFactDetails: async (pageId: string): Promise<WikimediaDetailResponse<WikimediaFact>> => {
    const response = await api.get<WikimediaDetailResponse<WikimediaFact>>(`/WikimediaFact/${pageId}`);
    return response.data;
  },

  toggleFactFavorite: async (pageId: string): Promise<ToggleFavoriteResponse> => {
    const response = await api.post<ToggleFavoriteResponse>(`/WikimediaFact/${pageId}/toggle-favorite`);
    return response.data;
  },

  // MONUMENTS
  searchMonuments: async (request: WikimediaSearchRequest): Promise<WikimediaSearchResponse<WikimediaMonument>> => {
    const response = await api.post<WikimediaSearchResponse<WikimediaMonument>>('/WikimediaMonument/search', request);
    return response.data;
  },

  getMonumentDetails: async (pageId: string): Promise<WikimediaDetailResponse<WikimediaMonument>> => {
    const response = await api.get<WikimediaDetailResponse<WikimediaMonument>>(`/WikimediaMonument/${pageId}`);
    return response.data;
  },

  toggleMonumentFavorite: async (pageId: string): Promise<ToggleFavoriteResponse> => {
    const response = await api.post<ToggleFavoriteResponse>(`/WikimediaMonument/${pageId}/toggle-favorite`);
    return response.data;
  },

  // PERSONS
  searchPersons: async (request: WikimediaSearchRequest): Promise<WikimediaSearchResponse<WikimediaPerson>> => {
    const response = await api.post<WikimediaSearchResponse<WikimediaPerson>>('/WikimediaPerson/search', request);
    return response.data;
  },

  getPersonDetails: async (pageId: string): Promise<WikimediaDetailResponse<WikimediaPerson>> => {
    const response = await api.get<WikimediaDetailResponse<WikimediaPerson>>(`/WikimediaPerson/${pageId}`);
    return response.data;
  },

  togglePersonFavorite: async (pageId: string): Promise<ToggleFavoriteResponse> => {
    const response = await api.post<ToggleFavoriteResponse>(`/WikimediaPerson/${pageId}/toggle-favorite`);
    return response.data;
  },

  // PLACES
  searchPlaces: async (request: WikimediaSearchRequest): Promise<WikimediaSearchResponse<WikimediaPlace>> => {
    const response = await api.post<WikimediaSearchResponse<WikimediaPlace>>('/WikimediaPlace/search', request);
    return response.data;
  },

  getPlaceDetails: async (pageId: string): Promise<WikimediaDetailResponse<WikimediaPlace>> => {
    const response = await api.get<WikimediaDetailResponse<WikimediaPlace>>(`/WikimediaPlace/${pageId}`);
    return response.data;
  },

  togglePlaceFavorite: async (pageId: string): Promise<ToggleFavoriteResponse> => {
    const response = await api.post<ToggleFavoriteResponse>(`/WikimediaPlace/${pageId}/toggle-favorite`);
    return response.data;
  },

  // FAVORITES
  getFactFavorites: async (): Promise<WikimediaSearchResponse<WikimediaFact>> => {
    const response = await api.get<WikimediaSearchResponse<WikimediaFact>>('/WikimediaFact/favorites');
    return response.data;
  },

  getMonumentFavorites: async (): Promise<WikimediaSearchResponse<WikimediaMonument>> => {
    const response = await api.get<WikimediaSearchResponse<WikimediaMonument>>('/WikimediaMonument/favorites');
    return response.data;
  },

  getPersonFavorites: async (): Promise<WikimediaSearchResponse<WikimediaPerson>> => {
    const response = await api.get<WikimediaSearchResponse<WikimediaPerson>>('/WikimediaPerson/favorites');
    return response.data;
  },

  getPlaceFavorites: async (): Promise<WikimediaSearchResponse<WikimediaPlace>> => {
    const response = await api.get<WikimediaSearchResponse<WikimediaPlace>>('/WikimediaPlace/favorites');
    return response.data;
  },

  // Get all favorites at once
  getAllFavorites: async (): Promise<FavoritesResponse> => {
    const [facts, monuments, persons, places] = await Promise.all([
      wikimediaApi.getFactFavorites(),
      wikimediaApi.getMonumentFavorites(),
      wikimediaApi.getPersonFavorites(),
      wikimediaApi.getPlaceFavorites(),
    ]);

    return {
      success: true,
      message: 'Favorites retrieved successfully',
      data: {
        facts: facts.data,
        monuments: monuments.data,
        persons: persons.data,
        places: places.data,
      },
    };
  },
};