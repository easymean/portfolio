import { useCallback, useEffect, useRef, useState } from 'react';
import './style.scss';
import { calLenCss } from '@/utils/styles';
import Icon from '@/components/icon';

type Props = {
  colWidth: string;
  items: { id: string; content: React.ReactNode }[];
};

export const Slider = ({ items = [], colWidth }: Props) => {
  const [curPage, setCurPage] = useState<number>(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const [offset, setOffset] = useState<number>(0);

  const validatePage = useCallback(
    (nextPage: number) => {
      return Math.max(0, Math.min(nextPage, items.length - 1));
    },
    [items],
  );

  const moveScroll = useCallback(
    (pageOffset: number) => {
      const scrollContainer = scrollRef.current;
      if (!scrollContainer) return;

      const moveOffset = offset * pageOffset;
      scrollContainer.scrollBy({
        left: moveOffset,
        behavior: 'smooth',
      });
    },
    [offset],
  );

  const onClickLeft = useCallback(
    (curPage: number) => {
      const nextPage = validatePage(curPage - 1);
      if (nextPage === curPage) return;
      moveScroll(-1);
    },
    [validatePage, moveScroll],
  );

  const onClickRight = useCallback(
    (curPage: number) => {
      const nextPage = validatePage(curPage + 1);
      if (nextPage === curPage) return;
      moveScroll(1);
    },
    [validatePage, moveScroll],
  );

  const handleScroll = useCallback(
    (e: Event) => {
      const posX = (e.target as HTMLElement).scrollLeft;

      const page = Math.ceil(Math.abs(posX) / offset);
      const nextPage = validatePage(page);
      setCurPage(nextPage);
    },
    [validatePage, offset],
  );

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  const resizeCenter = useCallback(() => {
    const offset = calLenCss('4rem') + calLenCss(colWidth);
    setOffset(offset);
  }, [colWidth]);

  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      resizeCenter();

      window.addEventListener('resize', () => {
        resizeCenter();
      });

      return () => {
        window.removeEventListener('resize', () => {
          resizeCenter();
        });
      };
    }
  }, [resizeCenter]);
  return (
    <div className="slider">
      <div className="scroll-container" ref={scrollRef}>
        <ul className="slider-list" role="list" ref={listRef}>
          {items.length > 0 &&
            items.map((el) => (
              <li
                key={el.id}
                id={el.id}
                className="slider-item"
                style={{ width: `${colWidth}px` }}
              >
                {el.content}
              </li>
            ))}
        </ul>
      </div>
      <ul className="slider-controller">
        <button disabled={curPage === 0} onClick={() => onClickLeft(curPage)}>
          <Icon.chevronLeft />
        </button>
        <button
          disabled={curPage === items.length - 1}
          onClick={() => onClickRight(curPage)}
        >
          <Icon.chevronRight />
        </button>
      </ul>
    </div>
  );
};
