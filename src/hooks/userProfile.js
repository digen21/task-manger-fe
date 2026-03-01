import { fetchProfileApi } from "@/apis/api";
import { useQuery } from "@tanstack/react-query";

const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfileApi,
    retryDelay: 1000,
    retry: 2,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};

export default useProfile;
