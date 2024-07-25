// src/redux/imageUploadSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  imageFile: null,
  imageFileUrl: null,
  imageFileUploadProgress: null,
  imageFileUploadError: null,
};

const imageUploadSlice = createSlice({
  name: 'imageUpload',
  initialState,
  reducers: {
    setImageFile: (state, action) => {
      state.imageFile = action.payload;
    },
    setImageFileUrl: (state, action) => {
      state.imageFileUrl = action.payload;
    },
    setImageFileUploadProgress: (state, action) => {
      state.imageFileUploadProgress = action.payload;
    },
    setImageFileUploadError: (state, action) => {
      state.imageFileUploadError = action.payload;
    },
    resetImageUploadState: (state) => {
      state.imageFile = null;
      state.imageFileUrl = null;
      state.imageFileUploadProgress = null;
      state.imageFileUploadError = null;
    },
  },
});

export const {
  setImageFile,
  setImageFileUrl,
  setImageFileUploadProgress,
  setImageFileUploadError,
  resetImageUploadState,
} = imageUploadSlice.actions;

export default imageUploadSlice.reducer;
