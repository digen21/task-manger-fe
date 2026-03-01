import { registerApi } from "@/apis/api";
import { useMutation } from "@tanstack/react-query";

const useRegister = ({ onSuccess, onError } = {}) => {
  return useMutation({
    mutationFn: registerApi,
    onSuccess,
    onError,
  });
};

export default useRegister;
