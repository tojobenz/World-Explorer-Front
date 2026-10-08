// Wikimedia Search Request
export interface WikimediaSearchRequest {
  query: string;
  limit?: number;
  offset?: number;
}

// Wikimedia Search Response
export interface WikimediaSearchResponse<T> {
  success: boolean;
  message: string;
  data?: T[];
  total?: number;
}

// Wikimedia Detail Response
export interface WikimediaDetailResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

// Toggle Favorite Response
export interface ToggleFavoriteResponse {
  success: boolean;
  message: string;
  isFavorite?: boolean;
  data?: boolean;
}

// Generic Wikimedia Item
export interface WikimediaItem {
  pageId: string;
  title: string;
  description?: string;
  extract?: string;
  thumbnail?: string;
  thumbnailUrl?: string;
  url?: string;
  fullUrl?: string;
  category?: string;
  isFavorite?: boolean;
  coordinates?: string[] | { lat: number; lon: number };
}

// Fact specific
export interface WikimediaFact extends WikimediaItem {
  date?: string;
  year?: number;
  location?: string;
}

// Monument specific
export interface WikimediaMonument extends WikimediaItem {
  location?: string;
  yearBuilt?: string;
}

// Person specific
export interface WikimediaPerson extends WikimediaItem {
  birthDate?: string;
  deathDate?: string;
  occupation?: string;
  nationality?: string;
}

// Place specific
export interface WikimediaPlace extends WikimediaItem {
  country?: string;
  population?: number;
}

// Favorites Response
export interface FavoritesResponse {
  success: boolean;
  message: string;
  data?: {
    facts?: WikimediaFact[];
    monuments?: WikimediaMonument[];
    persons?: WikimediaPerson[];
    places?: WikimediaPlace[];
  };
}

// Wikimedia State
export interface WikimediaState {
  // Search results
  facts: WikimediaFact[];
  monuments: WikimediaMonument[];
  persons: WikimediaPerson[];
  places: WikimediaPlace[];
  
  // Current details
  currentFact: WikimediaFact | null;
  currentMonument: WikimediaMonument | null;
  currentPerson: WikimediaPerson | null;
  currentPlace: WikimediaPlace | null;
  
  // Favorites
  favorites: FavoritesResponse['data'] | null;
  
  // UI state
  loading: boolean;
  error: string | null;
  
  // Search state
  searchQuery: string;
  searchType: 'facts' | 'monuments' | 'persons' | 'places';
}