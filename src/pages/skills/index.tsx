import { Tab } from '@/components/tab';
import { Carousel } from '@/components/carousel';
import './style.scss';
import { useState } from 'react';
import Icon from '@/components/icon';
import { data } from './data';
import { Section, SectionHeader, SectionBody } from '@/components/section';

export const Skills = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const items = data.map((el) => ({
    ...el,
    content: <div className="tab-panel-wrapper">{el.content}</div>,
  }));

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
    const findIdx = data.findIndex((item) => item.id === id);
    setSelectedIdx(findIdx);
  };

  return (
    <Section>
      <SectionHeader>
        <div className="title">SKILLS</div>
      </SectionHeader>
      <SectionBody>
        <div className="skills">
          <div className="skills-wrapper">
            <Carousel
              items={sliders}
              selectedIdx={selectedIdx}
              colWidth={'30rem'}
            />
            <div className="tab-wrapper">
              <Tab items={items} onClickItem={onClickTab} />
            </div>
          </div>
        </div>
      </SectionBody>
    </Section>
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
        {fe
          .filter((el) => el.icon !== null)
          .map((el) => (
            <div key={el.id} className="grid-item">
              {el.icon}
            </div>
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
        {be
          .filter((el) => el.icon !== null)
          .map((el) => (
            <div key={el.id} className="grid-item">
              {el.icon}
            </div>
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
        {db
          .filter((el) => el.icon !== null)
          .map((el) => (
            <div key={el.id} className="grid-item">
              {el.icon}
            </div>
          ))}
      </div>
    </div>
  );
};
