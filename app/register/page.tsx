"use client";
import api from "@/services/api";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function registerPage() {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        
        
        // Implement registration logic here
        try {
            await api.post("/auth/register", {
                 name, 
                 email, 
                 password });
    
                alert("Register succes!");
                router.push("/login");
        } catch (error: any) {
            console.log(error);
            console.log(error.response);
            console.log(error.response?.data);
            
            alert(error.response?.data?.message || "Register failed");
        }
    };

        return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-black">
            Register
            </h1>
        
        <form onSubmit={handleRegister} className="space-y-4">
            <div>
            <label className="mb-1 block text-gray-900"> Name</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded border p-2 text-gray-500"
                placeholder="Enter your name"
                />
            </div>

            <div>
            <label className="mb-1 block text-gray-900">Email</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded border p-2 text-gray-500"
                placeholder="Enter your email"
                />
            </div>  

            <div>
            <label className="mb-1 block text-gray-900">Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded border p-2 text-gray-500"
                placeholder="Enter your password"
                />
            </div> 

            <button
                type="submit"
                className="w-full rounded bg-blue-500 py-2 text-white">
                Register
            </button>
        </form>
        </div>  
        </div>
    );
}