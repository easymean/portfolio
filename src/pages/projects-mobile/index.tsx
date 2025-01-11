import './style.scss';
import { useCallback, useEffect, useState } from 'react';
import { Carousel } from '@/components/carousel';
import { data } from '@/pages/projects/data';
import Icon from '@/components/icon';

type Checkpoint = {
  companyId: string;
  groupId: string;
  projectId: string;
};

export const ProjectsMobile = () => {
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [projects, setProjects] = useState<
    {
      id: string;
      content: JSX.Element;
    }[]
  >([]);
  const [company, setCompany] = useState<string>('');
  const [group, setGroup] = useState<string>('');
  const [selectedId, setSelectedId] = useState('');

  const setGroupInfo = useCallback(
    (selectedId: string, checkpoints: Checkpoint[]) => {
      const [target] = checkpoints.filter((el) => el.projectId === selectedId);
      if (!target) return;
      const [company] = data.filter((comp) => comp.id === target.companyId);
      const [group] = company.groups.filter(
        (group) => group.id === target.groupId,
      );
      setCompany(company.title);
      setGroup(group.description);
    },
    [],
  );

  const onClickLeft = useCallback(
    (curId: string) => {
      const idx = projects.findIndex((el) => el.id === curId);
      const nextIdx = Math.max(0, idx - 1);
      const nextId = projects[nextIdx].id;
      setSelectedId(nextId);
      setGroupInfo(nextId, checkpoints);
    },
    [projects, checkpoints, setGroupInfo],
  );

  const onClickRight = useCallback(
    (curId: string) => {
      const idx = projects.findIndex((el) => el.id === curId);
      const nextIdx = Math.min(projects.length - 1, idx + 1);
      const nextId = projects[nextIdx].id;
      setSelectedId(nextId);
      setGroupInfo(nextId, checkpoints);
    },
    [projects, checkpoints, setGroupInfo],
  );

  useEffect(() => {
    const initDataList = () => {
      const newCheckpoints: Checkpoint[] = [];
      const projects = data.reduce<{ id: string; content: JSX.Element }[]>(
        (acc, cur) => {
          const add = { companyId: cur.id, groupId: '', projectId: '' };

          cur.groups.forEach((group) => {
            newCheckpoints.push({
              ...add,
              groupId: group.id,
              projectId: group.projects[0].id,
            });
            acc = [
              ...acc,
              ...group.projects.map((el) => ({
                id: el.id,
                content: <Card title={el.title} description={el.description} />,
              })),
            ];
          });
          return acc;
        },
        [],
      );
      setCheckpoints([...newCheckpoints]);
      setProjects(projects);
      setSelectedId(projects[0].id);
      setGroupInfo(projects[0].id, [...newCheckpoints]);
    };
    initDataList();
  }, []);

  return (
    <div className="projects-mobile">
      <div className="projects-wrapper">
        <div className="title">PROJECTS</div>
        <div className="description">
          <div className="company">{company}</div>
          <div className="group">{group}</div>
        </div>
        <Carousel items={projects} selectedId={selectedId} colWidth={'22rem'} />
        <ul className="carousel-controller">
          <button onClick={() => onClickLeft(selectedId)}>
            <Icon.chevronLeft />
          </button>
          <button onClick={() => onClickRight(selectedId)}>
            <Icon.chevronRight />
          </button>
        </ul>
      </div>
    </div>
  );
};

type Props = {
  title: string;
  description: string;
};

const Card = ({ title, description }: Props) => {
  return (
    <div className="project-mobile-card">
      <div className="card-title">{title}</div>
      <div className="card-description">{description}</div>
    </div>
  );
};
