import useUpdateTask from "@/hooks/useUpdateProjects";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Spinner } from "./ui/spinner";

const columns = ["TODO", "IN_PROGRESS", "DONE"];

const getTaskId = (task) => task?.id ?? task?._id;

const TaskCard = ({ task, onStatusChange }) => (
  <Card className="w-full">
    <CardHeader className="flex pb-2">
      <CardTitle className="text-sm">{task.title}</CardTitle>
      <Select
        value={task.status}
        onValueChange={(value) => onStatusChange(getTaskId(task), value)}
      >
        <SelectTrigger className="h-7 w-25 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {columns.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </CardHeader>
    <CardContent className="space-y-1 text-xs">
      <p>Creator: {task.creator.email}</p>
      <p>Assignee: {task.assignee.email}</p>
      <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
    </CardContent>
  </Card>
);

export default function Kanban({ tasks, loading, projectId }) {
  const updateTask = useUpdateTask(projectId);

  const handleStatusChange = (taskId, status) => {
    if (!taskId) return;
    updateTask.mutate({ taskId, status });
  };

  if (loading)
    return (
      <>
        <Spinner />
      </>
    );

  return (
    <div className="grid h-150 grid-cols-1 gap-4 p-4 md:grid-cols-3">
      {columns.map((status) => (
        <div key={status} className="flex min-h-0 flex-col rounded-md border">
          <h3 className="border-b px-3 py-2 font-semibold">{status}</h3>
          <ScrollArea className="min-h-0 flex-1">
            <div className="space-y-2 p-2">
              {tasks
                .filter((t) => t.status === status)
                .map((t) => (
                  <TaskCard
                    key={getTaskId(t)}
                    task={t}
                    onStatusChange={handleStatusChange}
                  />
                ))}
            </div>
          </ScrollArea>
        </div>
      ))}
    </div>
  );
}
