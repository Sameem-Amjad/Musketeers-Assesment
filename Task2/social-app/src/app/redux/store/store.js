import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/app/redux/feature/auth/authSlice"
import postReducer from "@/app/redux/feature/post/postSlice"
export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer
    },
});
