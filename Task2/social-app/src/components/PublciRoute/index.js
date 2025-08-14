"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PublicRoute({ children }) {
    const token = useSelector((state) => state.auth.token);
    const router = useRouter();

    useEffect(() => {
        if (token) {
            router.push("/dashboard");
        }
    }, [token, router]);

    return !token ? children : null;
}
