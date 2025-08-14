"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const [friends, setFriends] = useState([]);
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const pathname = usePathname();

    useEffect(() => {
        axios.get(`${BASE_URL}/users`, { withCredentials: true })
            .then(res => setFriends(res.data.data || []))
            .catch(console.error);
    }, []);

    const navLinks = [
        { href: "/dashboard", label: "Home", icon: "🏠" },
        { href: "/dashboard/users", label: "Users", icon: "👥" },
    ];

    return (
        <aside className="w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white flex flex-col h-screen shadow-lg">
            {/* Logo */}
            <div className="p-6 text-2xl font-bold border-b border-blue-500">
                Musketee
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navLinks.map(link => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200
                            ${pathname === link.href
                                ? "bg-blue-500 shadow-md"
                                : "hover:bg-blue-500/50"}`}
                    >
                        <span className="text-lg">{link.icon}</span>
                        <span>{link.label}</span>
                    </Link>
                ))}
            </nav>

            {/* Friend Suggestions */}
            <div className="border-t border-blue-500 px-4 py-4">
                <h3 className="text-sm font-semibold text-blue-100 mb-3">Friend Suggestions</h3>
                <ul className="space-y-2 max-h-40 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-transparent">
                    {friends.length === 0 && (
                        <li className="text-xs text-blue-200">No suggestions</li>
                    )}
                    {friends.map(f => (
                        <li
                            key={f._id}
                            className="bg-blue-500/20 px-3 py-2 rounded-lg text-sm hover:bg-blue-500/40 transition"
                        >
                            {f.name}
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
