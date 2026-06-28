import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../axios";
import { Lead } from "@/types";

// API Fetchers
export const getLeads = async (): Promise<Lead[]> => {
  const { data } = await api.get("/leads");
  // Adjust depending on how your backend wraps responses (e.g., data.data)
  return data.data;
};

export const getLeadById = async (id: string): Promise<Lead> => {
  const { data } = await api.get(`/leads/${id}`);
  return data.data;
};

export const createLead = async (leadData: Partial<Lead>): Promise<Lead> => {
  const { data } = await api.post("/leads", leadData);
  return data.data;
};

export const updateLead = async ({
  id,
  ...leadData
}: Partial<Lead> & { id: string }): Promise<Lead> => {
  const { data } = await api.put(`/leads/${id}`, leadData);
  return data.data;
};

// React Query Hooks
export const useLeads = () => {
  return useQuery({
    queryKey: ["leads"],
    queryFn: getLeads,
  });
};

export const useLead = (id: string) => {
  return useQuery({
    queryKey: ["leads", id],
    queryFn: () => getLeadById(id),
    enabled: !!id,
  });
};

export const useCreateLead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLead,
    onSuccess: () => {
      // Invalidate and refetch leads list after creating a new one
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
};
