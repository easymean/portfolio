import { DataType } from './data';

export const initProjects = (data: DataType[]) => {
  const projects = data.reduce<
    { id: string; title: string; description: string }[]
  >((acc, cur) => {
    cur.groups.forEach((group) => {
      acc = [
        ...acc,
        ...group.projects.map((el) => ({
          id: el.id,
          title: el.title,
          description: el.description,
        })),
      ];
    });
    return acc;
  }, []);
  return projects;
};

export const initCheckPoints = (data: DataType[]) => {
  const checkpoints = data.reduce<
    { companyId: string; groupId: string; projectId: string }[]
  >((acc, cur) => {
    cur.groups.forEach((group) => {
      acc.push({
        companyId: cur.id,
        groupId: group.id,
        projectId: group.projects[0].id,
      });
    });
    return acc;
  }, []);

  return checkpoints;
};
