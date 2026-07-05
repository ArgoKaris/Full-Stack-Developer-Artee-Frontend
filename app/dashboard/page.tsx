"use client";
import { useEffect, useState } from "react";
import axios from "@/services/axios";
import DashboardCard from "@/components/dashboard.card";

    type DashboardData = {
        total: number;
        completed: number;
        pending: number;
    };

    export default function DashboardPage() {
        const [data, setData] = useState<DashboardData | null>(null);
        const [loading, setLoading] = useState(true);


      const fetchDashboard = async () => {
    try {
        const token = localStorage.getItem("token");

        const res = await axios.get("/dashboard", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        setData(res.data.data);
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
    };

        useEffect(() => {
            fetchDashboard();
        } , []);

        if (loading) {
            return <p className="p-4">Loading...</p>;
        }

        return (
            <div className="p-4 space-y-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-100 rounded shadow text-black-900">
                    <DashboardCard
                    title="Total Tasks"
                    value={data?.total ?? 0 }></DashboardCard>
                    </div>

                <div className="p-4 bg-gray-100 rounded shadow">
                   <DashboardCard
                   title="Completed"
                   value={data?.completed ?? 0 }></DashboardCard>
                </div>
                
                <div className="p-4 bg-gray-100 rounded shadow">
                    <DashboardCard
                        title="Pending Tasks"
                        value={data?.pending ?? 0 }>
                    </DashboardCard>
                </div>
            </div>
        </div>
    );
    }