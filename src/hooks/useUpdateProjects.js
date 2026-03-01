import { updateTasksApi } from "@/apis/api";
import queryClient from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

const getTaskId = (task) => task?.id ?? task?._id;

const useUpdateTask = (projectId) => {
  return useMutation({
    mutationFn: ({ taskId, status }) => updateTasksApi({ id: taskId, status }),

    async onMutate({ taskId, status }) {
      if (!projectId || !taskId) return {};

      await queryClient.cancelQueries({
        queryKey: ["tasks", projectId],
      });

      const previousTasks = queryClient.getQueryData(["tasks", projectId]);

      queryClient.setQueryData(["tasks", projectId], (old) => {
        if (!old) return old;

        if (Array.isArray(old)) {
          return old.map((task) =>
            getTaskId(task) === taskId ? { ...task, status } : task,
          );
        }

        if (Array.isArray(old.data)) {
          return {
            ...old,
            data: old.data.map((task) =>
              getTaskId(task) === taskId ? { ...task, status } : task,
            ),
          };
        }

        return old;
      });

      return { previousTasks };
    },

    onError(_err, _vars, ctx) {
      if (ctx?.previousTasks === undefined) return;
      queryClient.setQueryData(["tasks", projectId], ctx.previousTasks);
    },

    onSettled() {
      if (!projectId) return;
      queryClient.invalidateQueries({
        queryKey: ["tasks", projectId],
      });
    },
  });
};

export default useUpdateTask;
