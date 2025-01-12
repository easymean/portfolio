import { useCallback, useEffect, useRef } from 'react';
import './style.scss';

type Props = {
  colWidth: string;
  items: { id: string; content: React.ReactNode }[];
  selectedIdx: number;
  onSlide?: (nextIdx: number) => void;
};

export const Carousel = ({
  items = [],
  colWidth,
  selectedIdx = 0,
  onSlide,
}: Props) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevTouch = useRef<{ pageX: number; time: number }>({
    pageX: 0,
    time: 0,
  });

  const validatePage = useCallback(
    (nextPage: number) => {
      return Math.max(0, Math.min(nextPage, items.length - 1));
    },
    [items],
  );

  const slidePage = useCallback(
    (container: HTMLElement, nextPage: number) => {
      const targetPage = validatePage(nextPage);
      const [target] = [...container.querySelectorAll('.carousel-item')].filter(
        (_, idx) => idx === targetPage,
      );
      if (target instanceof HTMLElement) {
        const { offsetLeft } = target;
        const rect = container.getBoundingClientRect();
        const width = rect.width;

        container.style.setProperty(
          '--dist',
          `calc((${width}px - ${colWidth}) / 2 - ${offsetLeft}px)`,
        );
      }
    },
    [colWidth, validatePage],
  );

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      slidePage(container, selectedIdx);

      window.addEventListener('resize', () => {
        slidePage(container, selectedIdx);
      });

      return () => {
        window.removeEventListener('resize', () => {
          slidePage(container, selectedIdx);
        });
      };
    }
  }, [selectedIdx, slidePage]);

  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    const startX = e.touches[0].pageX;
    const startTime = performance.now();
    prevTouch.current = {
      pageX: startX,
      time: startTime,
    };
  };

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      e.preventDefault();
      if (!containerRef.current) return;
      const endX = e.changedTouches[0].pageX;
      const endTime = performance.now();
      const dist = endX - prevTouch.current.pageX;
      const time = endTime - prevTouch.current.time;
      const speed = Math.abs(dist / time);

      if (dist < 1) return;

      const diff = dist > 0 ? -1 : 1;
      let nextPage = selectedIdx + diff;
      if (speed > 0.5) {
        nextPage += diff;
      }
      const targetPage = validatePage(nextPage);
      if (typeof onSlide === 'function') onSlide(targetPage);
    },
    [selectedIdx, onSlide, validatePage],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart);
      container.addEventListener('touchend', handleTouchEnd);
      return () => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [handleTouchEnd]);

  return (
    <div className="carousel" ref={rootRef}>
      <div className="scroll-container">
        <div className="carousel-list" ref={containerRef}>
          {items.length > 0 &&
            items.map((el, idx) => (
              <div
                key={el.id}
                id={el.id}
                className="carousel-item"
                aria-selected={idx === selectedIdx}
                style={{ width: `${colWidth}px` }}
              >
                {el.content}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
