import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../axios";
import type { Deal } from "@/types";

interface GetDealsResponse {
  data: Deal[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export const getDeals = async (
  page: number,
  limit: number,
): Promise<GetDealsResponse> => {
  const response = await api.get("/deals", {
    params: {
      page,
      limit,
    },
  });
  return response.data;
};

export const useDeals = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["deals", page, limit],
    queryFn: () => getDeals(page, limit),
  });
};

export const createDeal = async (deal: Deal) => {
  const response = await api.post("/deals", deal);
  return response.data;
};

export const useCreateDeal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDeal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
    },
  });
};

export const updateDealStage = async ({
  dealId,
  stage,
}: {
  dealId: string;
  stage: string;
}) => {
  const response = await api.patch(`/deals/${dealId}/stage`, { stage });
  return response.data;
};

export const useUpdateDealStage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateDealStage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
    },
  });
};
