import { StickyScroll } from './sticky-scroll';
import './style.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { data } from './data';
import { Card } from '@/components/card';
import { Section, SectionBody, SectionHeader } from '@/components/section';
import { StickyContent } from './sticky-content';
import { initCheckPoints, initProjects } from './utils';

type Checkpoint = {
  companyId: string;
  groupId: string;
  projectId: string;
};

export const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [projects, setProjects] = useState<
    {
      id: string;
      content: JSX.Element;
    }[]
  >([]);
  const [company, setCompany] = useState<string>('');
  const [group, setGroup] = useState<string>('');

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
      const projects = initProjects(data).map((el) => ({
        id: el.id,
        content: (
          <Card
            key={el.id}
            id={el.id}
            title={el.title}
            className="project-card-container"
          >
            <p>{el.description}</p>
          </Card>
        ),
      }));
      const newCheckpoints = initCheckPoints(data);
      setCheckpoints(newCheckpoints);
      setProjects(projects);
    };
    initDataList();
  }, []);

  const observer = useRef<IntersectionObserver>();
  useEffect(() => {
    const handleScroll = () => {
      if (!stickyRef.current || !containerRef.current) return;

      const cards = [
        ...containerRef.current.querySelectorAll('.project-card-container'),
      ];
      const lastCard = cards[cards.length - 1];
      const rect = lastCard.getBoundingClientRect();

      if (rect.top <= 0) {
        stickyRef.current.classList.remove('fade-in');
      } else {
        stickyRef.current.classList.add('fade-in');
      }
    };
    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', handleScroll);
        } else {
          stickyRef.current?.classList.remove('fade-in');
          window.removeEventListener('scroll', handleScroll);
        }
      },
      { threshold: 0.1 },
    );

    const container = containerRef.current;
    if (container) {
      observer.current?.observe(container);
    }

    return () => {
      observer.current?.disconnect();
    };
  }, []);

  return (
    <Section>
      <SectionHeader className="projects-header-sticky">
        <div className="title">PROJECTS</div>
      </SectionHeader>
      <SectionBody className="projects-body">
        <div className="projects" ref={containerRef}>
          <div className="projects-wrapper">
            <div className="left">
              <StickyContent ref={stickyRef} company={company} group={group} />
            </div>
            <div className="right">
              <StickyScroll
                projects={projects}
                observeTargetIds={checkpoints.map((el) => el.projectId)}
                isIntersecting={isIntersecting}
              />
            </div>
          </div>
        </div>
      </SectionBody>
    </Section>
  );
};
