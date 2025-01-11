import { Tab } from '@/components/tab';
import { Carousel } from '@/components/carousel';
import './style.scss';
import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/icon';

export const Skills = () => {
  const [selectedId, setSelectedId] = useState('fe');

  const items = [
    {
      id: 'fe',
      label: 'FRONTEND',
      content: (
        <div className="tab-panel-wrapper">
          React와 Redux, Zustand의 전역 상태 관리 라이브러리를 사용하여 복잡한
          상태를 관리할 수 있고 Redux-saga, Redux-thunk, React-Query를 사용해본
          경험이 있습니다.
          <br />
          Vue3, Composition API, Pinia를 사용하여 어플리케이션을 개발한 경험이
          있습니다.
        </div>
      ),
    },
    {
      id: 'be',
      label: 'BACKEND',
      content: (
        <div className="tab-panel-wrapper">
          Spring Boot와 NestJS + TypeORM을 사용한 경험이 있습니다.
          <br />
          RESTful API를 설계하고 구현할 수 있습니다.
          <br />
          검색을 통해 CRUD를 사용한 간단한 기능과 및 로그인 기능 구현이
          가능합니다.
        </div>
      ),
    },
    {
      id: 'db',
      label: 'DATABASE',
      content: (
        <div className="tab-panel-wrapper">
          서버를 설치하고 환경을 구성한 경험이 있습니다.
          <br />
          GUI 도구를 활용하여 DB와 연결하고 SQL 쿼리를 작성할 수 있습니다.
          <br />
          간단한 데이터 스키마를 설계할 수 있습니다.
        </div>
      ),
    },
  ];

  const sliders = [
    {
      id: 'fe',
      content: <FeContent />,
    },
    {
      id: 'be',
      content: <BeContent />,
    },
    {
      id: 'db',
      content: <DbContent />,
    },
  ];

  const onClickTab = (id: string) => {
    setSelectedId(id);
  };

  const observer = useRef<IntersectionObserver>();
  const observeTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observeTarget.current?.classList.add('move-in');
        } else {
          observeTarget.current?.classList.remove('move-in');
        }
      },
      {
        threshold: 0.6,
      },
    );

    if (observer.current && observeTarget.current) {
      observer.current.observe(observeTarget.current);
      return () => {
        observer.current?.disconnect();
      };
    }
  }, []);

  return (
    <div className="skills">
      <div className="skills-wrapper" ref={observeTarget}>
        <div className="title">SKILLS</div>
        <Carousel items={sliders} selectedId={selectedId} colWidth={'500px'} />
        <div className="tab-wrapper">
          <Tab items={items} onClickItem={onClickTab} />
        </div>
      </div>
    </div>
  );
};

const FeContent = () => {
  const fe = [
    { id: 'html', icon: <Icon.html width="80" height="80" /> },
    { id: 'css', icon: <Icon.css width="80" height="80" /> },
    { id: 'scss', icon: <Icon.sass width="80" height="80" /> },
    { id: 'js', icon: <Icon.js width="100" height="100" /> },
    { id: 'ts', icon: <Icon.ts width="100" height="100" /> },
    { id: 'react', icon: <Icon.react width="100" height="100" /> },
    { id: 'vue', icon: <Icon.vue width="100" height="100" /> },
  ];
  return (
    <div className="slider-wrapper">
      <div className="grid fe">
        {fe.map((el) => (
          <>
            {el.icon && (
              <div key={el.id} className="grid-item">
                {el.icon}
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

const BeContent = () => {
  const be = [
    { id: 'springboot', icon: <Icon.spring width="120" height="120" /> },
    { id: 'nestjs', icon: <Icon.nestjs width="100" height="100" /> },
    { id: 'typeorm' },
  ];
  return (
    <div className="slider-wrapper">
      <div className="grid be">
        {be.map((el) => (
          <>
            {el.icon && (
              <div key={el.id} className="grid-item">
                {el.icon}
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

const DbContent = () => {
  const db = [
    { id: 'postgres', icon: <Icon.psql width="100" height="100" /> },
    { id: 'mariadb', icon: <Icon.mariadb width="200" height="150" /> },
  ];
  return (
    <div className="slider-wrapper">
      <div className="grid be">
        {db.map((el) => (
          <>
            {el.icon && (
              <div key={el.id} className="grid-item">
                {el.icon}
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};
