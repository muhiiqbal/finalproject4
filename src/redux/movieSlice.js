import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMovie = createAsyncThunk(
  "movie/fetchMovie",
  async (keyword) => {
    const res = await axios.get(
      `http://www.omdbapi.com/?s=${keyword}&apikey=e22e4271`
    );
    console.log(res);
    if (res.data.Response === "True") {
      const formatRes = await res.data.Search;
      return formatRes;
    } else {
      const formatRes = await res.data.Response;
      return formatRes;
    }
  }
);

export const fetchMovieDetail = createAsyncThunk(
  "movie/fetchMovieDetail",
  async (id) => {
    const res = await axios.get(
      `http://www.omdbapi.com/?i=${id}&apikey=32de02a1`
    );
    const formatRes = await res.data;
    console.log(formatRes);
    return formatRes;
  }
);

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    data: [],
    detail: [],
    queryID: null,
    loadingState: false,
    errorState: false,
  },
  reducers: {
    setQueryID: (state, action) => {
      state.queryID = action.payload;
    },
  },
  extraReducers: {
    [fetchMovie.fulfilled]: (state, action) => {
      if (action.payload !== "False") {
        state.data = action.payload;
        state.errorState = false;
      } else {
        state.errorState = true;
      }
      // state.data = action.payload;
      state.loadingState = false;
    },
    [fetchMovie.pending]: (state) => {
      state.loadingState = true;
    },
    [fetchMovieDetail.fulfilled]: (state, action) => {
      state.detail = action.payload;
      state.loadingState = false;
    },
    [fetchMovieDetail.pending]: (state) => {
      state.loadingState = true;
    },
  },
});

export const { setQueryID } = movieSlice.actions;

export default movieSlice.reducer;