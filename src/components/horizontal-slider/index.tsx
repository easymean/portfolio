import './style.scss';
import { useEffect, useRef } from 'react';

type Props = {
  slider: React.ReactNode;
  sticky?: React.ReactNode;
};

export const HorizontalSlider = ({ slider, sticky }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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
    <div className="horizontal-slider" ref={containerRef}>
      <div className="sticky-content">
        {sticky}
        <div className="scroll-container" ref={scrollRef}>
          {slider}
        </div>
      </div>
    </div>
  );
};
