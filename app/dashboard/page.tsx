"use client";
import { useEffect, useState } from "react";
import api from "@/services/axios";

    type DashboardData = {
        total: number;
        completed: number;
        pending: number;
    };

    export default function DashboardPage() {
        const [data, setData] = useState<DashboardData | null>(null);
        const [loading, setLoading] = useState(true);

        const fatchDashboard = async () => {
            try {
                const res = await api.get("/dashboard");
                setData(res.data.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        useEffect(() => {
            fatchDashboard();
        } , []);

        if (loading) {
            return <p className="p-4">Loading...</p>;
        }

        return (
            <div className="p-4 space-y-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-100 rounded shadow">
                        <p className="text-black">Total Task</p>
                        <h2 className="text-3xl font-bold ">{data?.total}</h2>
                    </div>

                <div className="p-4 bg-gray-100 rounded shadow">
                    <p className="text-black">Completed</p>
                    <h2 className="text-3xl font-bold">{data?.completed}</h2>
                </div>
                
                <div className="p-4 bg-gray-100 rounded shadow">
                    <p className="text-black">Pending</p>
                    <h2 className="text-3xl font-bold">{data?.pending}</h2>
                </div>
            </div>
        </div>
    );
    }