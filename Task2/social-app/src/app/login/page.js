"use client";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/app/redux/feature/auth/authSlice.js";
import { useState } from "react";
import PublicRoute from "@/components/PublciRoute";
import Link from "next/link";

export default function LoginPage() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const [form, setForm] = useState({ name: "", password: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(form));
    };

    return (
        <PublicRoute>
            <div className="font-sans flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
                    <h1 className="text-3xl font-bold text-blue-600 mb-4">Login</h1>
                    <p className="text-gray-600 mb-6">
                        Welcome back! Please enter your credentials to continue.
                    </p>

                    {error && <p className="text-red-500 mb-4">{error.message}</p>}

                    <form onSubmit={handleSubmit} className="space-y-3 text-black">
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full border p-2 rounded-lg"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border p-2 rounded-lg"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                        <button
                            disabled={loading}
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            {loading ? "Loading..." : "Login"}
                        </button>
                    </form>

                    <p className="mt-4 text-sm text-gray-500">
                        Don’t have an account?{" "}
                        <Link href="/register" className="text-blue-500 hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </PublicRoute>
    );
}
