import { fetchTasksApi } from "@/apis/api";
import { useQuery } from "@tanstack/react-query";

const useTasks = (query = {}) => {
  return useQuery({
    queryKey: ["tasks", query.projectId],
    queryFn: () => fetchTasksApi(query),
    enabled: Boolean(query.projectId),
    retryDelay: 1000,
    retry: 2,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};

export default useTasks;