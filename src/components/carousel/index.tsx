import { useCallback, useEffect, useRef } from 'react';
import './style.scss';

type Props = {
  selectedId: string;
  colWidth: string;
  items: { id: string; content: React.ReactNode }[];
};

export const Carousel = ({ items = [], colWidth, selectedId }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const slideItem = useCallback(
    (container: HTMLElement, id: string) => {
      const [target] = [...container.querySelectorAll('.carousel-item')].filter(
        (el) => el.id === id,
      );
      if (target instanceof HTMLElement) {
        const { offsetLeft } = target;
        const rect = container.getBoundingClientRect();
        const width = rect?.width ?? 0;

        container.style.setProperty(
          '--dist',
          `calc((${width}px - ${colWidth}) / 2 - ${offsetLeft}px)`,
        );
      }
    },
    [colWidth],
  );

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      slideItem(container, selectedId);

      window.addEventListener('resize', () => {
        slideItem(container, selectedId);
      });

      return () => {
        window.removeEventListener('resize', () => {
          slideItem(container, selectedId);
        });
      };
    }
  }, [selectedId, slideItem]);

  return (
    <div className="carousel">
      <div className="carousel-list" ref={containerRef}>
        {items.length > 0 &&
          items.map((el) => (
            <div
              key={el.id}
              id={el.id}
              className="carousel-item"
              aria-selected={el.id === selectedId}
              style={{ width: `${colWidth}px` }}
            >
              {el.content}
            </div>
          ))}
      </div>
    </div>
  );
};
