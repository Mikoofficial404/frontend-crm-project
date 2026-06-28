import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../axios";
import type { Lead } from "@/types";

type GetLeadsResponse = {
  data: Lead[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

export const getLeads = async (
  page: number,
  limit: number,
  search: string,
  status: string,
): Promise<GetLeadsResponse> => {
  const { data } = await api.get("/leads", {
    params: {
      page,
      limit,
      search,
      status,
    },
  });

  return data;
};

export const createLead = async (leadData: Partial<Lead>): Promise<Lead> => {
  const { data } = await api.post("/leads", leadData);
  return data.data;
};

export const updateLeadStatus = async ({
  id,
  ...leadData
}: Partial<Lead> & { id: string }): Promise<{ id: string; status: string }> => {
  const { data } = await api.patch(`/leads/${id}/status`, leadData);
  return data.data;
};

export const useLeads = (
  page: number,
  limit: number,
  search: string,
  status: string,
) => {
  return useQuery({
    queryKey: ["leads", page, limit, search, status],
    queryFn: () => getLeads(page, limit, search, status),
  });
};

export const useCreateLead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
};
