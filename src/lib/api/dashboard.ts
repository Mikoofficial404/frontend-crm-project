import { useQuery } from "@tanstack/react-query";

import { api } from "../axios";


type GetDashboardStatsResponse = {
    total_leads: number;
    total_deals: number;
    total_revenue_won: number;
    potential_revenue: number;
}

export const getDashboardStats = async (): Promise<GetDashboardStatsResponse> => {
    const { data} = await api.get("/dashboard")
    return data.data;
}

export const useDashboardStats = () => {
    return useQuery({
        queryKey: ["dashboard"],
        queryFn: () => getDashboardStats()
    })
}

