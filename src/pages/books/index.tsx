import { CardList } from './card-grid-list';
import './style.scss';
import { useEffect, useRef } from 'react';

export const Books = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLUListElement>(null);

  const cards = [
    {
      id: 'Effective Java',
      front: { content: <>front</> },
      back: { content: <>back</> },
    },
    {
      id: '모던 자바스크립트 딥다이브',
      front: { content: <></> },
      back: { content: <></> },
    },
    {
      id: '프로그래머의 뇌',
      front: { content: <></> },
      back: { content: <></> },
    },
    {
      id: '우아한 타입스크립트',
      front: { content: <></> },
      back: { content: <></> },
    },
    {
      id: '클린 아키텍처',
      front: { content: <></> },
      back: { content: <></> },
    },
    {
      id: '함수형 자바스크립트',
      front: { content: <></> },
      back: { content: <></> },
    },
  ];

  const observer = useRef<IntersectionObserver>();
  useEffect(() => {
    const setContainerHeight = () => {
      if (!scrollRef.current || !containerRef.current || !stickyRef.current) {
        return;
      }
      const scrollHeight =
        scrollRef.current.offsetWidth -
        stickyRef.current.offsetWidth +
        stickyRef.current.offsetHeight;

      containerRef.current.style.height = `${scrollHeight}px`;
    };

    const setTranslateX = () => {
      if (!scrollRef.current || !containerRef.current || !stickyRef.current) {
        return;
      }
      const scrollOffset = window.scrollY - containerRef.current.offsetTop;
      const maxTranslateX =
        scrollRef.current.offsetWidth - stickyRef.current.offsetWidth;
      const translateX = Math.min(maxTranslateX, Math.max(0, scrollOffset));
      scrollRef.current.style.transform = `translateX(-${translateX}px)`;
    };

    const handleScroll = () => {
      setContainerHeight();
      setTranslateX();
    };

    const handleResize = () => {
      setContainerHeight();
    };

    setContainerHeight();

    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', handleScroll);
          window.addEventListener('resize', handleResize);
        } else {
          window.removeEventListener('scroll', handleScroll);
          window.removeEventListener('resize', handleResize);
        }
      },
      { threshold: 0.1 },
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
      <div className="books-sticky-wrapper" ref={stickyRef}>
        <div className="title">BOOKS</div>
        <div className="scroll-container">
          <CardList items={cards} ref={scrollRef} />
        </div>
      </div>
    </div>
  );
};
