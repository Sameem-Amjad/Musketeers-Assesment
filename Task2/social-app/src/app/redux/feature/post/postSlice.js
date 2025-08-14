"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/v1/api";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/posts`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
        return res.data.data;
    } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
});

export const createPost = createAsyncThunk("posts/createPost", async (postData, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.post(`${BASE_URL}/posts`,
            postData, {
            headers: {
                Authorization: `Bearer ${token}`
            },

        });
        return res.data.data;
    } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
});

export const deletePost = createAsyncThunk("posts/deletePost", async (postId, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        await axios.delete(`${BASE_URL}/posts/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },

        });
        return postId;
    } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
});

export const likePost = createAsyncThunk("posts/likePost", async (postId, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        await axios.post(`${BASE_URL}/posts/${postId}/like`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            },

        });
        return postId;
    } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
});

export const fetchComments = createAsyncThunk("posts/fetchComments", async (postId, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/posts/${postId}/comments`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return res.data.data;
    } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
});

export const addComment = createAsyncThunk("posts/addComment", async ({ postId, comment }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.post(`${BASE_URL}/posts/${postId}/comments`, { text: comment }, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return res.data.data;
    } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
});

export const searchPosts = createAsyncThunk("posts/searchPosts", async (query, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/search/posts?q=${query}&limit=10&page=1`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return res.data.data.posts;
    } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
});

const postsSlice = createSlice({
    name: "posts",
    initialState: { posts: [], comments: {}, loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => { state.loading = true; })
            .addCase(fetchPosts.fulfilled, (state, action) => { state.loading = false; state.posts = action.payload; })
            .addCase(fetchPosts.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(createPost.fulfilled, (state, action) => { state.posts.unshift(action.payload); })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(p => p._id !== action.payload);
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.comments[action.meta.arg] = action.payload;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                const postId = action.payload.postId;
                if (state.comments[postId]) {
                    state.comments[postId].push(action.payload);
                } else {
                    state.comments[postId] = [action.payload];
                }
            })
            .addCase(searchPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
            });
    }
});

export default postsSlice.reducer;
