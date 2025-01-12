import './style.scss';
import { useCallback, useEffect, useState } from 'react';
import { Carousel } from '@/components/carousel';
import { data } from '@/pages/projects/data';
import Icon from '@/components/icon';
import { Card } from '@/components/card';

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
  const [selectedIdx, setSelectedIdx] = useState(0);

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
    (curIdx: number) => {
      const nextIdx = Math.max(0, curIdx - 1);
      setSelectedIdx(nextIdx);
      const nextId = projects[nextIdx].id;
      setGroupInfo(nextId, checkpoints);
    },
    [projects, checkpoints, setGroupInfo],
  );

  const onClickRight = useCallback(
    (curIdx: number) => {
      const nextIdx = Math.min(projects.length - 1, curIdx + 1);
      setSelectedIdx(nextIdx);
      const nextId = projects[nextIdx].id;
      setGroupInfo(nextId, checkpoints);
    },
    [projects, checkpoints, setGroupInfo],
  );

  const handleSlide = useCallback(
    (nextIdx: number) => {
      setSelectedIdx(nextIdx);
      const nextId = projects[nextIdx].id;
      setGroupInfo(nextId, checkpoints);
    },
    [checkpoints, setGroupInfo, projects],
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
                content: (
                  <Card
                    title={el.title}
                    description={el.description}
                    className="project-mobile-card"
                  />
                ),
              })),
            ];
          });
          return acc;
        },
        [],
      );
      setCheckpoints([...newCheckpoints]);
      setProjects(projects);
      setSelectedIdx(0);
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
        <Carousel
          items={projects}
          selectedIdx={selectedIdx}
          colWidth={'22rem'}
          onSlide={handleSlide}
        />
        <ul className="carousel-controller">
          <button
            disabled={selectedIdx === 0}
            onClick={() => onClickLeft(selectedIdx)}
          >
            <Icon.chevronLeft />
          </button>
          <button
            disabled={selectedIdx === projects.length - 1}
            onClick={() => onClickRight(selectedIdx)}
          >
            <Icon.chevronRight />
          </button>
        </ul>
      </div>
    </div>
  );
};
