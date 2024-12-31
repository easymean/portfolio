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

  const data: DataType[] = [
    {
      id: 'ncsoft',
      title: 'NCSOFT (22.01.02~',
      groups: [
        {
          id: 'varco',
          description: 'VARCO 개발실 AI 서비스 FE 개발(2024.01~현재)',
          projects: [
            {
              id: 'varcoadmin',
              content: (
                <Card
                  title="VARCO Art Admin"
                  description="이미지 생성 AI 서비스인 VARCO Art를 SaaS로 제공하기 위한 어드민툴입니다. 사용자를 초대하여 VARCO Art에 접근 권한을 부여하고 사용자의 토큰과 이미지 생성 권한, 활동 내역을 관리합니다."
                />
              ),
            },
            {
              id: 'varcoui',
              content: (
                <Card
                  title="VARCO UI"
                  description="이미지 생성 AI 서비스인 VARCO Art를 SaaS로 제공하기 위한 어드민툴입니다. 사용자를 초대하여 VARCO Art에 접근 권한을 부여하고 사용자의 토큰과 이미지 생성 권한, 활동 내역을 관리합니다."
                />
              ),
            },
            {
              id: 'varcotext',
              content: (
                <Card
                  title="VARCO Text"
                  description="이미지 생성 AI 서비스인 VARCO Art를 SaaS로 제공하기 위한 어드민툴입니다. 사용자를 초대하여 VARCO Art에 접근 권한을 부여하고 사용자의 토큰과 이미지 생성 권한, 활동 내역을 관리합니다."
                />
              ),
            },
          ],
        },
        {
          id: 'speechai',
          description: '음성AI랩 AI 프로젝트 FE 개발(2023.05~2023.12)',
          projects: [
            {
              id: 'designsystem',
              content: (
                <Card
                  title="디자인 시스템 제작 및 공통 컴포넌트 개발"
                  description="이미지 생성 AI 서비스인 VARCO Art를 SaaS로 제공하기 위한 어드민툴입니다. 사용자를 초대하여 VARCO Art에 접근 권한을 부여하고 사용자의 토큰과 이미지 생성 권한, 활동 내역을 관리합니다."
                />
              ),
            },
            {
              id: 'speech',
              content: (
                <Card
                  title="Co-creative AI"
                  description="이미지 생성 AI 서비스인 VARCO Art를 SaaS로 제공하기 위한 어드민툴입니다. 사용자를 초대하여 VARCO Art에 접근 권한을 부여하고 사용자의 토큰과 이미지 생성 권한, 활동 내역을 관리합니다."
                />
              ),
            },
          ],
        },
        {
          id: 'miniverse',
          description: '메타버스 플랫폼 ‘미니버스’ FE 개발(2022.07~2023.01)',
          projects: [
            {
              id: 'miniverse',
              content: (
                <Card
                  title="미니버스 직무 상담회 버전 런칭 및 MVP 버전 FE 개발"
                  description="이미지 생성 AI 서비스인 VARCO Art를 SaaS로 제공하기 위한 어드민툴입니다. 사용자를 초대하여 VARCO Art에 접근 권한을 부여하고 사용자의 토큰과 이미지 생성 권한, 활동 내역을 관리합니다."
                />
              ),
            },
          ],
        },
        {
          id: 'bard',
          description: 'CH.공성전 FE 개발(2022.01~2022.06)',
          projects: [
            {
              id: 'bard',
              content: (
                <Card
                  title="CH.공성전 베타 버전 개발"
                  description="이미지 생성 AI 서비스인 VARCO Art를 SaaS로 제공하기 위한 어드민툴입니다. 사용자를 초대하여 VARCO Art에 접근 권한을 부여하고 사용자의 토큰과 이미지 생성 권한, 활동 내역을 관리합니다."
                />
              ),
            },
          ],
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
          projects: [
            {
              id: 'si',
              content: (
                <Card
                  title="이마트 관련 B2B 시스템 운영 및 개발"
                  description="이미지 생성 AI 서비스인 VARCO Art를 SaaS로 제공하기 위한 어드민툴입니다. 사용자를 초대하여 VARCO Art에 접근 권한을 부여하고 사용자의 토큰과 이미지 생성 권한, 활동 내역을 관리합니다."
                />
              ),
            },
          ],
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
        stickyRef.current.classList.add('fade-out');
      } else {
        stickyRef.current.classList.remove('fade-out');
      }
    };
    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', handleScroll);
        } else {
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
    <div className="projects" ref={containerRef}>
      <div className="projects-wrapper">
        <div className="left">
          <div className="sticky-wrapper" ref={stickyRef}>
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

type Props = {
  title: string;
  description: string;
};
const Card = ({ title, description }: Props) => {
  return (
    <div className="project-card-container">
      <div className="card-title">{title}</div>
      <div className="card-description">{description}</div>
    </div>
  );
};
