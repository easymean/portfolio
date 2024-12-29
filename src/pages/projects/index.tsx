import { FadeText } from '@/components/fade-text';
import { ScrollContainer } from './ScrollContainer';
import './style.scss';
import { useCallback, useEffect, useRef, useState } from 'react';

type DataType = {
  id: string;
  title: string;
  groups: {
    id: string;
    description: string;
    projects: { id: string; content: JSX.Element }[];
  }[];
};

type Checkpoint = {
  companyId: string;
  groupId: string;
  projectId: string;
};

export const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [projects, setProjects] = useState<
    {
      id: string;
      content: JSX.Element;
    }[]
  >([]);
  const [company, setCompany] = useState<string>('');
  const [group, setGroup] = useState<string>('');

  const data: DataType[] = [
    {
      id: 'ncsoft',
      title: 'NCSOFT (22.01.02~',
      groups: [
        {
          id: 'varco',
          description: 'varco 개발실',
          projects: [
            { id: 'varcoart', content: <>varco art</> },
            { id: 'varcoui', content: <>varco ui</> },
            { id: 'varcotext', content: <>varco text</> },
          ],
        },
        {
          id: 'speechai',
          description: 'speech ai 개발실',
          projects: [
            { id: 'designsystem', content: <div>design system</div> },
            { id: 'speech', content: <>speech</> },
          ],
        },
        {
          id: 'miniverse',
          description: 'miniverse 개발실',
          projects: [{ id: 'miniverse', content: <>miniverse</> }],
        },
        {
          id: 'bard',
          description: 'BARD 개발실',
          projects: [{ id: 'bard', content: <>bard</> }],
        },
      ],
    },
    {
      id: 'sinsegae',
      title: '신세계I&C (21.02~21.12)',
      groups: [
        {
          id: 'emart2',
          description: '이마트 2팀',
          projects: [{ id: 'si', content: <>si</> }],
        },
      ],
    },
  ];

  const isIntersecting = useCallback(
    (projectId: string) => {
      const [target] = checkpoints.filter((el) => el.projectId === projectId);
      const [company] = data.filter((comp) => comp.id === target.companyId);
      const [group] = company.groups.filter(
        (group) => group.id === target.groupId,
      );
      setCompany(company.title);
      setGroup(group.description);
    },
    [checkpoints],
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
            acc = [...acc, ...group.projects];
          });
          return acc;
        },
        [],
      );
      setCheckpoints([...newCheckpoints]);
      setProjects(projects);
    };
    initDataList();
  }, []);

  return (
    <div className="projects" ref={containerRef}>
      <div className="projects-wrapper">
        <div className="left">
          <div className="sticky-wrapper">
            <div className="title">PROJECTS</div>
            <FadeText text={company} classname="company" />
            <FadeText text={group} classname="group" />
          </div>
        </div>
        <div className="right">
          <ScrollContainer
            projects={projects}
            observeTargetIds={checkpoints.map((el) => el.projectId)}
            isIntersecting={isIntersecting}
          />
        </div>
      </div>
    </div>
  );
};
