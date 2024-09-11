// slices/carSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {baseApi} from "../api/baseApi";

const carSlice = createSlice({
    name: 'car',
    initialState: {
        content: [],
        pageable: {},
        totalElements: 0,
        totalPages: 0,
        currentPage: 0,
    },
    reducers: {
        setCars: (state, action) => {
            state.content = action.payload.content;
            state.pageable = action.payload.pageable;
            state.totalElements = action.payload.totalElements;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.pageable.pageNumber;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(baseApi.endpoints.getCars.matchFulfilled, (state, action) => {
                const { content, pageable, totalElements, totalPages } = action.payload;
                state.content = content;
                state.pageable = pageable;
                state.totalElements = totalElements;
                state.totalPages = totalPages;
                state.currentPage = pageable.pageNumber;
            });
    },
});

export const { setCars, setCurrentPage } = carSlice.actions;

export default carSlice.reducer;
