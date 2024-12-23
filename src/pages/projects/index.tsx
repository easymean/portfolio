import { Slider } from '@/components/slider';
import { CardSlider } from './CardSlider';
import './style.scss';
import { useState } from 'react';

export const Projects = () => {
  const [selectedId, setSelectedId] = useState<string>('varco');
  const middleSlider = [
    {
      id: 'varco',
      content: <div className="slide-content-wrapper">varco</div>,
    },
    {
      id: 'speech',
      content: <div className="slide-content-wrapper">speech</div>,
    },
    {
      id: 'miniverse',
      content: <div className="slide-content-wrapper">miniverse</div>,
    },
    { id: 'bard', content: <div className="slide-content-wrapper">bard</div> },
  ];
  const cards = [
    {
      groupId: 'varco',
      id: 'varco art',
      front: { content: <>front</> },
      back: { content: <>back</> },
    },
    {
      groupId: 'varco',
      id: 'varco ui',
      front: { content: <></> },
      back: { content: <></> },
    },
    {
      groupId: 'varco',
      id: 'varco text',
      front: { content: <></> },
      back: { content: <></> },
    },
    {
      groupId: 'varco',
      id: 'design system',
      front: { content: <></> },
      back: { content: <></> },
    },
    {
      groupId: 'varco',
      id: 'speech',
      front: { content: <></> },
      back: { content: <></> },
    },
    {
      groupId: 'miniverse',
      id: 'miniverse',
      front: { content: <></> },
      back: { content: <></> },
    },
    {
      groupId: 'bard',
      id: 'bard',
      front: { content: <></> },
      back: { content: <></> },
    },
  ];
  return (
    <div className="projects">
      <div className="projects-wrapper">
        <div className="title">PROJECTS</div>
        <Slider
          items={middleSlider}
          colWidth={'100%'}
          selectedId={selectedId}
        />
        <CardSlider items={cards} />
      </div>
    </div>
  );
};
