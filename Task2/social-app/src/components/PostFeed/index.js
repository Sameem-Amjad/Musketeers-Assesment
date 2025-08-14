"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost, likePost } from "@/app/redux/feature/post/postSlice.js";

export default function PostList() {
    const dispatch = useDispatch();
    const { posts, loading } = useSelector(state => state.post);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    if (loading) return <p className="text-center text-gray-500">Loading posts...</p>;

    return (
        <div className="space-y-6">
            {posts.map(post => (
                <div
                    key={post._id}
                    className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
                >
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-blue-600">{post.userId.name}</h4>
                        <span className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-700">{post.text}</p>
                    <div className="flex space-x-4 mt-4">
                        <button
                            onClick={() => dispatch(likePost(post._id))}
                            className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-600 px-3 py-1 rounded-lg transition"
                        >
                            👍 Like
                        </button>
                        <button
                            onClick={() => dispatch(deletePost(post._id))}
                            className="text-sm bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded-lg transition"
                        >
                            🗑 Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
