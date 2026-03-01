import { loginApi } from "@/apis/api";
import { useMutation } from "@tanstack/react-query";

const useLogin = () => {
  return useMutation({
    mutationFn: loginApi,
  });
};

export default useLogin;
