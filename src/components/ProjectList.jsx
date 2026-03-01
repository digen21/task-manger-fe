import React, { useEffect } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Spinner } from "./ui/spinner";

const ProjectList = ({ projects = [], isLoading, projectId, setProjectId }) => {
  useEffect(() => {
    if (!projectId && projects?.length) {
      setProjectId(projects[0].id);
    }
  }, [projects, projectId]);

  if (isLoading)
    return (
      <>
        <Spinner />
      </>
    );

  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <div className="flex justify-between">
          <h4 className="mb-4 text-sm leading-none font-medium">Projects</h4>
          <h4 className="mb-4 text-sm leading-none font-medium">
            {projects.meta.total}
          </h4>
        </div>
        {projects.data.map((project) => (
          <React.Fragment key={project.id ?? project._id}>
            <div
              className="cursor-pointer text-sm"
              onClick={() => setProjectId(project.id ?? project._id)}
            >
              {project.name}
              {(project.id ?? project._id) === projectId ? " (Selected)" : ""}
            </div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ProjectList;
