import { useCallback, useEffect, useRef } from 'react';
import './style.scss';

type Props = {
  selectedId: string;
  colWidth: number;
  items: { id: string; content: React.ReactNode }[];
};

export const Slider = ({ items = [], colWidth, selectedId }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const slideItem = useCallback(
    (container: HTMLElement, id: string) => {
      const getCenterX = (container: HTMLElement) => {
        const rect = container.getBoundingClientRect();
        const width = rect?.width ?? 0;
        return (width - colWidth) / 2;
      };

      const [target] = [...container.querySelectorAll('.slider-item')].filter(
        (el) => el.id === id,
      );
      if (target instanceof HTMLElement) {
        const { offsetLeft } = target;
        const centerX = getCenterX(container);

        const dist = centerX - offsetLeft;
        container.style.setProperty('--dist', `${dist}px`);
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
    <div className="slider">
      <div className="slider-list" ref={containerRef}>
        {items.length > 0 &&
          items.map((el) => (
            <div
              key={el.id}
              id={el.id}
              className="slider-item"
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
