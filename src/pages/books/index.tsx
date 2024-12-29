import { Slider } from '@/components/slider';
import { CardSlider } from './card-slider';
import './style.scss';
import { useEffect, useRef, useState } from 'react';

export const Books = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLUListElement>(null);

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
  ];

  const observer = useRef<IntersectionObserver>();
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current || !containerRef.current) {
        return;
      }
      const scrollOffset = window.scrollY - containerRef.current.offsetTop;
      const translateX = Math.max(0, scrollOffset);
      scrollRef.current.style.transform = `translateX(-${translateX}px)`;
    };

    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', handleScroll);
        } else {
          window.removeEventListener('scroll', handleScroll);
        }
      },
      { threshold: 0.2 },
    );

    if (containerRef.current) {
      observer.current?.observe(containerRef.current);
    }

    return () => {
      observer.current?.disconnect();
    };
  }, []);
  return (
    <div className="books" ref={containerRef}>
      <div className="books-wrapper">
        <div className="title">BOOKS</div>
        <Slider
          items={middleSlider}
          colWidth={'100%'}
          selectedId={selectedId}
        />
        <div className="scroll-container">
          <CardSlider items={cards} ref={scrollRef} />
        </div>
      </div>
    </div>
  );
};
