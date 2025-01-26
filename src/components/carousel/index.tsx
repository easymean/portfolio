import { useCallback, useEffect, useRef } from 'react';
import './style.scss';

type Props = {
  colWidth: string;
  items: { id: string; content: React.ReactNode }[];
  selectedIdx: number;
  onSlide?: (nextIdx: number) => void;
};

export const Carousel = ({ items = [], colWidth, selectedIdx = 0 }: Props) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLUListElement>(null);

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

  return (
    <div className="carousel" ref={rootRef}>
      <div className="scroll-container">
        <ul className="carousel-list" role="list" ref={containerRef}>
          {items.length > 0 &&
            items.map((el, idx) => (
              <li
                key={el.id}
                id={el.id}
                className="carousel-item"
                aria-selected={idx === selectedIdx}
                style={{ width: `${colWidth}px` }}
              >
                {el.content}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
