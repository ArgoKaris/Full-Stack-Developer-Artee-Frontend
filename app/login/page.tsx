"use client";
import { useState } from "react";
import axios from "@/services/axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handlelogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            const res = await axios.post("/auth/login", {
                    email,
                    password,
            });

            localStorage.setItem("token", res.data.data.token);

            router.push("/dashboard");
       
        } catch (error: any) {
            alert(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handlelogin}
                className="w-full max-w-md rounded-lg bg-white p-8 shadow-md"
                >
                <h1 className="mb-6 text-center text-2xl font-bold text-black">
                    Login</h1>

            <input
                type="email"
                placeholder="Email"
                className="mb-4 w-full rounded border p-3 text-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

            <input 
                type="password"
                placeholder="Password"
                className="mb-6 w-full rounded border p-3 text-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />    

            <button
                type="submit"
                className="w-full rounded bg-blue-500 py-2 cursor-pointer"
                >
                {loading ? "Loading..." : "Login"}
            </button>
        </form>
    </div>
    );
}
