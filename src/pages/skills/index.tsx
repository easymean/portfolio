import { Tab } from '@/components/tab';
import { Slider } from '@/components/slider';
import './style.scss';
import { useState } from 'react';

export const Skills = () => {
  const [selectedId, setSelectedId] = useState('fe');
  const fe = [{ id: 'React', label: 'React', value: '80' }];

  const items = [
    { id: 'fe', label: 'Frontend', content: <div>FE</div> },
    { id: 'be', label: 'Backend', content: <div>BE</div> },
  ];

  const sliders = [
    {
      id: 'fe',
      content: (
        <div style={{ height: '300px', background: 'yellow' }}>FEddddd</div>
      ),
    },
    {
      id: 'be',
      content: (
        <div style={{ height: '300px', background: 'red' }}>BEddddd</div>
      ),
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
        <Tab items={items} onClickItem={onClickTab} />
      </div>
    </div>
  );
};
