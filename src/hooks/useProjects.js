import { fetchProjectApi } from "@/apis/api";
import { useQuery } from "@tanstack/react-query";

const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjectApi,
    retryDelay: 1000,
    retry: 2,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};

export default useProjects;
