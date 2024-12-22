import { Tab } from '@/components/tab';
import { Slider } from '@/components/slider';
import './style.scss';
import { useState } from 'react';
import { ProgressBar } from './ProgressBar';

export const Skills = () => {
  const [selectedId, setSelectedId] = useState('fe');

  const items = [
    {
      id: 'fe',
      label: 'FRONTEND',
      content: (
        <div className="tab-panel-wrapper">
          React
          <br /> Redux, Zustand의 전역 상태 관리 라이브러리를 사용하여 복잡한
          상태를 관리할 수 있고 Redux-saga, Redux-thunk, React-Query를 사용해본
          경험이 있습니다.
          <br />
          Vue3
          <br /> Composition API와 Pinia를 사용하여 어플리케이션을 개발한 경험이
          있습니다.
        </div>
      ),
    },
    {
      id: 'be',
      label: 'BACKEND',
      content: <div className="tab-panel-wrapper">BE</div>,
    },
    {
      id: 'db',
      label: 'DATABASE',
      content: <div className="tab-panel-wrapper">DB</div>,
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
      content: <BeContent />,
    },
  ];

  const onClickTab = (id: string) => {
    setSelectedId(id);
  };

  return (
    <div className="skills">
      <div className="skills-wrapper">
        <div className="title">SKILLS</div>
        <Slider items={sliders} selectedId={selectedId} colWidth={500} />
        <div className="tab-wrapper">
          <Tab items={items} onClickItem={onClickTab} />
        </div>
      </div>
    </div>
  );
};

const FeContent = () => {
  const fe = [
    { id: 'js', label: 'JS/TS', value: '80' },
    { id: 'react', label: 'React', value: '80' },
    { id: 'vue', label: 'Vue3', value: '60' },
    { id: 'html', label: 'HTML/CSS', value: '80' },
  ];
  return (
    <div className="slider-wrapper">
      {fe.map((el) => (
        <ProgressBar {...el} key={el.id} />
      ))}
    </div>
  );
};

const BeContent = () => {
  const be = [
    { id: 'react', label: 'React', value: '80' },
    { id: 'vue', label: 'Vue3', value: '60' },
    { id: 'vue', label: 'HTML/CSS', value: '80' },
  ];
  return (
    <div className="slider-wrapper">
      {be.map((el) => (
        <ProgressBar {...el} key={el.id} />
      ))}
    </div>
  );
};
