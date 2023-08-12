import { createSlice } from "@reduxjs/toolkit";


const filmsSlice = createSlice({
  name: 'films',
  initialState: {
    favoriteFilms: [],
    currentFilm: {
      data: [],
      loading: true,
      error: false,
    },
    popularFilms: {
      data: [],
      error: false,
      loading: true
    },
    searchResult: {
      data: [],
      loading: true,
      error: false
    },
    movieCredits: {
      data: [],
      loading: true,
      error: false
    },
    movieImages: {
      data: [],
      loading: true,
      error: false
    },
    popularActors: {
      data: [],
      loading: true,
      error: false
    },
    topRated: {
      data: [],
      error: false,
      loading: true
    },
    searchText: '',
    currentPage: 1,
    totalPages: 0,
    currentIndex: 0,
    paginationUrl: '',
    apiKey: 'c20c870a9997852e1d7423c5e9069153'
  },
  reducers: {
    setPopularFilmsResult: (state, action) => {
      state.popularFilms.data = action.payload;
    },
    setPopularFilmsError: (state, action) => {
      state.popularFilms.error = action.payload
    },
    setPopularFilmsLoading: (state, action) => {
      state.popularFilms.loading = action.payload
    },
    updateSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setPaginationUrl: (state, action) => {
      state.paginationUrl = action.payload;
    },

    setPopularActors: (state, action) => {
      state.popularActors.data = action.payload
    },
    setPopularActorsError: (state, action) => {
      state.popularActors.error = action.payload
    },
    setPopularActorsLoading: (state, action) => {
      state.popularActors.loading = action.payload
    },
    setTopRated: (state, action) => {
      state.topRated.data = action.payload
    },
    setTopRatedError: (state, action) => {
      state.topRated.error = action.payload
    },
    setTopRatedLoading: (state, action) => {
      state.topRated.loading = action.payload
    },
    setMovieCreditsResult: (state, action) => {
      state.movieCredits.data = action.payload
    },
    setMovieImages: (state, action) => {
      state.movieImages.data = action.payload
    },
    setMovieImagesLoading: (state, action) => {
      state.movieImages.loading = action.payload

    },
    setMovieImagesError: (state, action) => {
      state.movieImages.error = action.payload;
    },
    setNextSlide: (state, action) => {
      state.currentIndex = (state.currentIndex + 1) % state.movieCredits.data.length;
    }, setPrevSlide: (state, action) => {
      state.currentIndex = (state.currentIndex - 1) % state.movieCredits.data.length;
    },
    setMovieCreditsLoading: (state, action) => {
      state.movieCredits.loading = action.payload
    },
    setMovieCreditsError: (state, action) => {
      state.movieCredits.error = action.payload;
    }
    ,
    setFavoriteFilms: (state, action) => {
      state.favoriteFilms = action.payload;
    },
    addToFavoriteFilms: (state, action) => {
      state.favoriteFilms = [...state.favoriteFilms, action.payload]
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    }
    ,
    removeFromFavoriteFilms: (state, action) => {
      state.favoriteFilms = state.favoriteFilms.filter(film => action.payload.id !== film.id)
    },
    setCurrentFilm: (state, action) => {
      state.currentFilm.data = action.payload;
    },
    setCurrentFilmLoading: (state, action) => {
      state.currentFilm.loading = action.payload;
    },
    setCurrentFilmError: (state, action) => {
      state.currentFilm.error = action.payload;
    },
    setSearchResult: (state, action) => {
      state.searchResult.data = action.payload;
    },
    setSearchResultLoading: (state, action) => {
      state.searchResult.loading = action.payload;
    },
    setSearchResultError: (state, action) => {
      state.searchResult.error = action.payload;
    },
  },
}
);

export const selectPopularFilmsResult = state => state.films.popularFilms.data;
export const selectPopularFilmsError = state => state.films.popularFilms.error;
export const selectPopularFilmsLoading = state => state.films.popularFilms.loading;

export const selectFavoriteFilms = state => state.films.favoriteFilms;

export const selectCurrentFilm = state => state.films.currentFilm.data;
export const selectCurrentFilmLoading = state => state.films.currentFilm.loading;
export const selectCurrentFilmError = state => state.films.currentFilm.error;


export const selectSearchResult = state => state.films.searchResult.data;
export const selectSearchResultLoading = state => state.films.searchResult.loading;
export const selectSearchResultError = state => state.films.searchResult.error;

export const selectSearchText = state => state.films.searchText;

export const selectCurrentPage = state => state.films.currentPage;
export const selectTotalPages = state => state.films.totalPages;

export const selectMovieCreditsResult = state => state.films.movieCredits.data;
export const selectMovieCreditsLoading = state => state.films.movieCredits.loading;
export const selectMovieCreditsError = state => state.films.movieCredits.error;

export const selectCurrentIndex = state => state.films.currentIndex;

export const selectMovieImagesResult = state => state.films.movieImages.data;
export const selectMovieImagesLoading = state => state.films.movieImages.loading;
export const selectMovieImagesError = state => state.films.movieImages.error;


export const selectPopularActorsResult = state => state.films.popularActors.data;
export const selectPopularActorsLoading = state => state.films.popularActors.loading;
export const selectPopularActorsError = state => state.films.popularActors.error;



export const selectTopRatedResult = state => state.films.topRated.data;
export const selectTopRatedLoading = state => state.films.topRated.loading;
export const selectTopRatedError = state => state.films.topRated.error;

export const selectPaginationUrl = state => state.films.paginationUrl;
export const selectApiKey = state => state.films.apiKey;


export const { setPopularFilmsResult, setFavoriteFilms, setCurrentFilm, setCurrentFilmLoading, setCurrentFilmError, setSearchResult, setSearchResultError, setSearchResultLoading, addToFavoriteFilms, removeFromFavoriteFilms, updateSearchText, setCurrentPage, setTotalPages, setMovieCreditsError, setMovieCreditsLoading, setMovieCreditsResult, setNextSlide, setPrevSlide, setMovieImages, setMovieImagesError, setMovieImagesLoading, setPopularActors, setPopularActorsError, setPopularActorsLoading, setTopRated, setTopRatedError, setTopRatedLoading, setPaginationUrl, setPopularFilmsError, setPopularFilmsLoading } = filmsSlice.actions;

export default filmsSlice.reducer;