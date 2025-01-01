import { CardList } from './card-grid-list';
import './style.scss';
import { useEffect, useRef } from 'react';

export const Books = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLUListElement>(null);

  const cards = [
    {
      id: 'deepdive',
      front: {
        content: (
          <div className="card-front">
            <a href="https://diligent-purpose-677.notion.site/69d4b6ad7b53485eac2ad224f009379c?pvs=4">
              모던 자바스크립트 딥다이브
            </a>
          </div>
        ),
      },
      back: {
        content: <></>,
      },
    },
    {
      id: 'brain',
      front: {
        content: (
          <div className="card-front">
            <a href="https://diligent-purpose-677.notion.site/9d3db58363dd41a5b8b1454ee7838fe5?pvs=4">
              프로그래머의 뇌
            </a>
          </div>
        ),
      },
      back: { content: <></> },
    },
    {
      id: 'ts',
      front: {
        content: (
          <div className="card-front">
            <a href="https://diligent-purpose-677.notion.site/with-afef141d3564470a9ee44b9b8f7cea12?pvs=4">
              우아한 타입스크립트
            </a>
          </div>
        ),
      },
      back: { content: <></> },
    },
    {
      id: 'cleanarchitecture',
      front: {
        content: (
          <div className="card-front">
            <a href="https://diligent-purpose-677.notion.site/7aec9b2f9e9f47be941a51be7bfd70fc?pvs=4">
              클린 아키텍처
            </a>
          </div>
        ),
      },
      back: { content: <></> },
    },
    {
      id: 'fpjavascript',
      front: {
        content: (
          <div className="card-front">
            <a href="https://diligent-purpose-677.notion.site/1248e9b49e0080ce83ede8e961914382?pvs=4">
              함수형 자바스크립트
            </a>
          </div>
        ),
      },
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
