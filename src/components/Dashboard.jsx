import useProjects from "@/hooks/useProjects";
import useTasks from "@/hooks/useTasks";
import { useState } from "react";
import Kanban from "./Kanban";
import ProjectList from "./ProjectList";

const Dashboard = () => {
  // const { isLoading } = useProfile();
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const [projectId, setProjectId] = useState(null);

  const { data: tasksData, isLoading: taskLoading } = useTasks({ projectId });
  const tasks = tasksData?.data ?? [];
  // const statusCount = tasksData?.statusCount ?? [];

  return (
    <div className="flex h-[calc(100vh-56px)]">
      <div className="p-4">
        <ProjectList
          isLoading={projectsLoading}
          projects={projects}
          setProjectId={setProjectId}
        />
      </div>
      <div className="flex-1">
        <Kanban tasks={tasks} loading={taskLoading} projectId={projectId} />
      </div>
    </div>
  );
};

export default Dashboard;
