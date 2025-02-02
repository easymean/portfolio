import { Card } from '@/components/card';
import { data } from './data';
import './style.scss';
import { useEffect, useRef } from 'react';
import Icon from '@/components/icon';
import { Section, SectionBody, SectionHeader } from '@/components/section';

export const Books = () => {
  const cards = data.map((el) => (
    <Card
      key={el.id}
      className="book-card"
      title={el.title}
      footer={
        <div className="footer">
          <button type="button" onClick={() => moveTo(el.link)}>
            <Icon.addPlus width="64" height="64" />
          </button>
        </div>
      }
    ></Card>
  ));

  const moveTo = (link: string) => {
    window.open(link);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLUListElement>(null);

  const observer = useRef<IntersectionObserver>();
  useEffect(() => {
    const setContainerHeight = () => {
      if (!scrollRef.current || !containerRef.current) {
        return;
      }

      const scrollHeight = scrollRef.current.offsetWidth;
      containerRef.current.style.height = `${scrollHeight}px`;
    };

    const setTranslateX = () => {
      if (!scrollRef.current || !containerRef.current) {
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const scrollOffset = -rect.top;
      const maxTranslateX =
        scrollRef.current.offsetWidth - containerRef.current.offsetWidth;
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
    <Section className="books">
      <SectionHeader className="books-header-sticky">
        <div className="title">STUDY</div>
      </SectionHeader>
      <SectionBody>
        <div ref={containerRef}>
          <div className="scroll-container sticky">
            <ul className="card-grid-list" ref={scrollRef}>
              {cards}
            </ul>
          </div>
        </div>
      </SectionBody>
    </Section>
  );
};
