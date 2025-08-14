"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/app/redux/feature/auth/authSlice.js";
import {
    fetchPosts,
    likePost,
    addComment,
    fetchComments,
} from "@/app/redux/feature/post/postSlice";
import PrivateRoute from "@/components/PrivateRoute";
import PostList from "@/components/PostFeed/index.js";

export default function DashboardPage() {
    const dispatch = useDispatch();
    const { posts, comments } = useSelector((state) => state.post);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const handleLike = (postId) => {
        dispatch(likePost(postId));
    };

    const handleAddComment = (postId, comment) => {
        dispatch(addComment({ postId, comment }));
    };

    const handleFetchComments = (postId) => {
        dispatch(fetchComments(postId));
    };

    return (
        <PrivateRoute>
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-blue-600">Dashboard</h1>
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
                        onClick={() => dispatch(logout())}
                    >
                        Logout
                    </button>
                </div>
                <PostList
                    posts={posts}
                    comments={comments}
                    onLike={handleLike}
                    onAddComment={handleAddComment}
                    onFetchComments={handleFetchComments}
                />
            </div>
        </PrivateRoute>
    );
}
