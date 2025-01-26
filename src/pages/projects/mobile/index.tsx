import './style.scss';
import { useCallback, useEffect, useState } from 'react';
import { data } from '@/pages/projects/data';
import { Card } from '@/components/card';
import { initCheckPoints, initProjects } from '../utils';
import { Slider } from '@/components/slider';
import { Section, SectionBody, SectionHeader } from '@/components/section';

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

  const handleScroll = useCallback(
    (nextIdx: number) => {
      const nextId = projects[nextIdx].id;
      setGroupInfo(nextId, checkpoints);
    },
    [checkpoints, setGroupInfo, projects],
  );

  useEffect(() => {
    const initDataList = () => {
      const projects = initProjects(data).map((el) => ({
        id: el.id,
        content: (
          <Card
            key={el.id}
            id={el.id}
            title={el.title}
            className="project-mobile-card"
          >
            <p>{el.description}</p>
          </Card>
        ),
      }));
      const newCheckpoints = initCheckPoints(data);
      setCheckpoints(newCheckpoints);
      setProjects(projects);
      setGroupInfo(projects[0].id, [...newCheckpoints]);
    };
    initDataList();
  }, []);

  return (
    <Section className="projects-mobile">
      <SectionHeader>
        <div className="title">PROJECTS</div>
      </SectionHeader>
      <SectionBody>
        <div className="projects-wrapper">
          <div className="description">
            <div className="company">{company}</div>
            <div className="group">{group}</div>
          </div>
          <Slider items={projects} colWidth={'22rem'} onScroll={handleScroll} />
        </div>
      </SectionBody>
    </Section>
  );
};
