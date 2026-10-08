import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { wikimediaApi } from '../../services/wikimediaApi';
import type {
  WikimediaState,
  WikimediaSearchRequest,
} from '../../types/wikimedia';

const initialState: WikimediaState = {
  facts: [],
  monuments: [],
  persons: [],
  places: [],
  currentFact: null,
  currentMonument: null,
  currentPerson: null,
  currentPlace: null,
  favorites: null,
  loading: false,
  error: null,
  searchQuery: '',
  searchType: 'facts',
};

// Search Facts
export const searchFacts = createAsyncThunk(
  'wikimedia/searchFacts',
  async (request: WikimediaSearchRequest, { rejectWithValue }) => {
    try {
      const response = await wikimediaApi.searchFacts(request);
      if (response.success && response.data) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Search failed');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Search failed');
    }
  }
);

// Search Monuments
export const searchMonuments = createAsyncThunk(
  'wikimedia/searchMonuments',
  async (request: WikimediaSearchRequest, { rejectWithValue }) => {
    try {
      const response = await wikimediaApi.searchMonuments(request);
      if (response.success && response.data) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Search failed');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Search failed');
    }
  }
);

// Search Persons
export const searchPersons = createAsyncThunk(
  'wikimedia/searchPersons',
  async (request: WikimediaSearchRequest, { rejectWithValue }) => {
    try {
      const response = await wikimediaApi.searchPersons(request);
      if (response.success && response.data) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Search failed');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Search failed');
    }
  }
);

// Search Places
export const searchPlaces = createAsyncThunk(
  'wikimedia/searchPlaces',
  async (request: WikimediaSearchRequest, { rejectWithValue }) => {
    try {
      const response = await wikimediaApi.searchPlaces(request);
      if (response.success && response.data) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Search failed');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Search failed');
    }
  }
);

// Get Fact Details
export const getFactDetails = createAsyncThunk(
  'wikimedia/getFactDetails',
  async (pageId: string, { rejectWithValue }) => {
    try {
      const response = await wikimediaApi.getFactDetails(pageId);
      if (response.success && response.data) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Failed to get details');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get details');
    }
  }
);

// Get Monument Details
export const getMonumentDetails = createAsyncThunk(
  'wikimedia/getMonumentDetails',
  async (pageId: string, { rejectWithValue }) => {
    try {
      const response = await wikimediaApi.getMonumentDetails(pageId);
      if (response.success && response.data) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Failed to get details');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get details');
    }
  }
);

// Get Person Details
export const getPersonDetails = createAsyncThunk(
  'wikimedia/getPersonDetails',
  async (pageId: string, { rejectWithValue }) => {
    try {
      const response = await wikimediaApi.getPersonDetails(pageId);
      if (response.success && response.data) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Failed to get details');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get details');
    }
  }
);

// Get Place Details
export const getPlaceDetails = createAsyncThunk(
  'wikimedia/getPlaceDetails',
  async (pageId: string, { rejectWithValue }) => {
    try {
      const response = await wikimediaApi.getPlaceDetails(pageId);
      if (response.success && response.data) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Failed to get details');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get details');
    }
  }
);

// Toggle Fact Favorite
export const toggleFactFavorite = createAsyncThunk(
  'wikimedia/toggleFactFavorite',
  async (pageId: string, { rejectWithValue }) => {
    try {
      const response = await wikimediaApi.toggleFactFavorite(pageId);
      if (response.success) {
        const isFavorite = response.isFavorite ?? (response as any).data;
        return { pageId, isFavorite };
      }
      return rejectWithValue(response.message || 'Failed to toggle favorite');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to toggle favorite');
    }
  }
);

// Toggle Monument Favorite
export const toggleMonumentFavorite = createAsyncThunk(
  'wikimedia/toggleMonumentFavorite',
  async (pageId: string, { rejectWithValue }) => {
    try {
      const response = await wikimediaApi.toggleMonumentFavorite(pageId);
      if (response.success) {
        const isFavorite = response.isFavorite ?? (response as any).data;
        return { pageId, isFavorite };
      }
      return rejectWithValue(response.message || 'Failed to toggle favorite');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to toggle favorite');
    }
  }
);

// Toggle Person Favorite
export const togglePersonFavorite = createAsyncThunk(
  'wikimedia/togglePersonFavorite',
  async (pageId: string, { rejectWithValue }) => {
    try {
      const response = await wikimediaApi.togglePersonFavorite(pageId);
      if (response.success) {
        const isFavorite = response.isFavorite ?? (response as any).data;
        return { pageId, isFavorite };
      }
      return rejectWithValue(response.message || 'Failed to toggle favorite');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to toggle favorite');
    }
  }
);

// Toggle Place Favorite
export const togglePlaceFavorite = createAsyncThunk(
  'wikimedia/togglePlaceFavorite',
  async (pageId: string, { rejectWithValue }) => {
    try {
      const response = await wikimediaApi.togglePlaceFavorite(pageId);
      if (response.success) {
        const isFavorite = response.isFavorite ?? (response as any).data;
        return { pageId, isFavorite };
      }
      return rejectWithValue(response.message || 'Failed to toggle favorite');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to toggle favorite');
    }
  }
);

// Get All Favorites
export const getAllFavorites = createAsyncThunk(
  'wikimedia/getAllFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const response = await wikimediaApi.getAllFavorites();
      if (response.success && response.data) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Failed to get favorites');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get favorites');
    }
  }
);

const wikimediaSlice = createSlice({
  name: 'wikimedia',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSearchType: (state, action) => {
      state.searchType = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearResults: (state) => {
      state.facts = [];
      state.monuments = [];
      state.persons = [];
      state.places = [];
    },
  },
  extraReducers: (builder) => {
    // Search Facts
    builder
      .addCase(searchFacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchFacts.fulfilled, (state, action) => {
        state.loading = false;
        state.facts = action.payload;
      })
      .addCase(searchFacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Search Monuments
    builder
      .addCase(searchMonuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMonuments.fulfilled, (state, action) => {
        state.loading = false;
        state.monuments = action.payload;
      })
      .addCase(searchMonuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Search Persons
    builder
      .addCase(searchPersons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPersons.fulfilled, (state, action) => {
        state.loading = false;
        state.persons = action.payload;
      })
      .addCase(searchPersons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Search Places
    builder
      .addCase(searchPlaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPlaces.fulfilled, (state, action) => {
        state.loading = false;
        state.places = action.payload;
      })
      .addCase(searchPlaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get Fact Details
    builder
      .addCase(getFactDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentFact = null;
      })
      .addCase(getFactDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentFact = action.payload;
      })
      .addCase(getFactDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get Monument Details
    builder
      .addCase(getMonumentDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentMonument = null;
      })
      .addCase(getMonumentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMonument = action.payload;
      })
      .addCase(getMonumentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get Person Details
    builder
      .addCase(getPersonDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentPerson = null;
      })
      .addCase(getPersonDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPerson = action.payload;
      })
      .addCase(getPersonDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get Place Details
    builder
      .addCase(getPlaceDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentPlace = null;
      })
      .addCase(getPlaceDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPlace = action.payload;
      })
      .addCase(getPlaceDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Toggle Fact Favorite
    builder
      .addCase(toggleFactFavorite.fulfilled, (state, action) => {
        const { pageId, isFavorite } = action.payload;
        const fact = state.facts.find(f => f.pageId === pageId);
        if (fact) fact.isFavorite = isFavorite;
        if (state.currentFact?.pageId === pageId) {
          state.currentFact.isFavorite = isFavorite;
        }
      });

    // Toggle Monument Favorite
    builder
      .addCase(toggleMonumentFavorite.fulfilled, (state, action) => {
        const { pageId, isFavorite } = action.payload;
        const monument = state.monuments.find(m => m.pageId === pageId);
        if (monument) monument.isFavorite = isFavorite;
        if (state.currentMonument?.pageId === pageId) {
          state.currentMonument.isFavorite = isFavorite;
        }
      });

    // Toggle Person Favorite
    builder
      .addCase(togglePersonFavorite.fulfilled, (state, action) => {
        const { pageId, isFavorite } = action.payload;
        const person = state.persons.find(p => p.pageId === pageId);
        if (person) person.isFavorite = isFavorite;
        if (state.currentPerson?.pageId === pageId) {
          state.currentPerson.isFavorite = isFavorite;
        }
      });

    // Toggle Place Favorite
    builder
      .addCase(togglePlaceFavorite.fulfilled, (state, action) => {
        const { pageId, isFavorite } = action.payload;
        const place = state.places.find(p => p.pageId === pageId);
        if (place) place.isFavorite = isFavorite;
        if (state.currentPlace?.pageId === pageId) {
          state.currentPlace.isFavorite = isFavorite;
        }
      });

    // Get All Favorites
    builder
      .addCase(getAllFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
      })
      .addCase(getAllFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchQuery, setSearchType, clearError, clearResults } = wikimediaSlice.actions;
export default wikimediaSlice.reducer;