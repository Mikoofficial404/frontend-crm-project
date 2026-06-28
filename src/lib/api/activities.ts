import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../axios";
import type { Activity } from "@/types";

type GetActivitesRepsonse = {
  data: Activity[];
};

export const getActivities = async ({
  leadId,
}: {
  leadId: string;
}): Promise<GetActivitesRepsonse> => {
  const response = await api.get(`/activities/${leadId}`);
  return response.data;
};

export const useActivities = (leadId: string) => {
  return useQuery({
    queryKey: ["activities", leadId],
    queryFn: () => getActivities({ leadId }),
  });
};

export const createActivity = async (
  activitiesData: Partial<Activity>,
): Promise<Activity> => {
  const { data } = await api.post("/activities", activitiesData);
  return data.data;
};

export const useCreateActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });
};

export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post<{ url: string }>("/upload", formData);

  return response.data.url;
};
