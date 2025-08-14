"use client";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/app/redux/feature/auth/authSlice.js";
import { useState } from "react";
import PublicRoute from "@/components/PublciRoute";
import Link from "next/link";

export default function RegisterPage() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const [form, setForm] = useState({
        name: "",
        profilePictureUrl: "",
        bio: "",
        interests: [],
        password: "",
        confirmPassword: "",
    });

    const [passwordError, setPasswordError] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const interestsOptions = ["cricket", "music", "movies"];

    const toggleInterest = (interest) => {
        setForm((prev) => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter((i) => i !== interest)
                : [...prev.interests, interest],
        }));
    };

    const validatePassword = (password) => {
        const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validatePassword(form.password)) {
            setPasswordError(
                "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
            );
            return;
        }

        if (form.password !== form.confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }
        console.log("Form submitted:", form);
        setPasswordError("");
        const { confirmPassword, ...payload } = form;
        dispatch(registerUser(payload));
    };

    return (
        <PublicRoute>
            <div className="font-sans flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-green-50 to-green-100">
                <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
                    <h1 className="text-3xl font-bold text-green-600 mb-4">Register</h1>
                    <p className="text-gray-600 mb-6">
                        Create your account and join our community today!
                    </p>

                    {error && <p className="text-red-500 mb-4">{error.message}</p>}
                    {passwordError && <p className="text-red-500 mb-4">{passwordError}</p>}

                    <form onSubmit={handleSubmit} className="space-y-3 text-left text-black">
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full border p-2 rounded-lg"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Profile Picture URL (optional)"
                            className="w-full border p-2 rounded-lg"
                            value={form.profilePictureUrl}
                            onChange={(e) =>
                                setForm({ ...form, profilePictureUrl: e.target.value })
                            }
                        />
                        <textarea
                            placeholder="Bio"
                            className="w-full border p-2 rounded-lg"
                            value={form.bio}
                            onChange={(e) => setForm({ ...form, bio: e.target.value })}
                        />
                        <div>
                            <p className="mb-2 text-gray-700">Select Interests:</p>
                            <div className="flex gap-3 flex-wrap">
                                {interestsOptions.map((interest) => (
                                    <label
                                        key={interest}
                                        className="flex items-center gap-1 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={form.interests.includes(interest)}
                                            onChange={() => toggleInterest(interest)}
                                        />
                                        {interest}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Password"
                                className="w-full border p-2 rounded-lg pr-10"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                            />
                            <span
                                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                            >
                                {passwordVisible ? "🙈" : "👁️"}
                            </span>
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <input
                                type={confirmPasswordVisible ? "text" : "password"}
                                placeholder="Confirm Password"
                                className="w-full border p-2 rounded-lg pr-10"
                                value={form.confirmPassword}
                                onChange={(e) =>
                                    setForm({ ...form, confirmPassword: e.target.value })
                                }
                            />
                            <span
                                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                                onClick={() =>
                                    setConfirmPasswordVisible(!confirmPasswordVisible)
                                }
                            >
                                {confirmPasswordVisible ? "🙈" : "👁️"}
                            </span>
                        </div>

                        <button
                            disabled={loading}
                            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                        >
                            {loading ? "Loading..." : "Register"}
                        </button>
                    </form>

                    <p className="mt-4 text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link href="/login" className="text-green-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </PublicRoute>
    );
}
