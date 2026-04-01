"use client";
import { Suspense } from "react";
import { Line } from "react-chartjs-2";
import {Chart as ChartJS,LineElement,CategoryScale,LinearScale,PointElement,Tooltip,Legend,ChartData} from "chart.js";
import { useEffect, useState, useCallback } from "react";
import {toast} from "sonner";
ChartJS.register(LineElement,CategoryScale,LinearScale,PointElement,Tooltip,Legend);

type SalesData = {
    _id: string;
    totalPrice: number;
};

export default function SalesChart({ chartType }: { chartType: string }) {
    const [chartData, setChartData] =
        useState<ChartData<"line"> | null>(null);

    const fetchSales = useCallback(async () => {

        try {
            const res = await fetch(`/api/order?type=${chartType}`);
            const data = await res.json();
            const salesData: SalesData[] = data.msg;
            setChartData({
                labels: salesData.map((d) => d._id),
                datasets: [
                    {
                        label: "Sales ($)",
                        data: salesData.map((d) => d.totalPrice),
                        borderColor: "#4F46E5",
                        backgroundColor: "rgba(79,70,229,0.2)",
                        tension: 0.4
                    }
                ]
            });
        } catch (error) {
            toast.error((error as Error).message);
        }
    }, [chartType]);

    useEffect(() => {
        setTimeout(() => {
            fetchSales();
        }, 0);
    }, [fetchSales]);

    if (!chartData) return <p>Loading...</p>;

    return <Suspense fallback="Loading...."><Line data={chartData} options={{
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 1200,
            easing: "easeOutQuart",
        }
    }} /></Suspense>
}





















