import { useCallback, useEffect, useRef, useState } from 'react';
import './style.scss';
import { Titles } from '../layout/mover/Titles';
import { Title } from '../layout/mover/Title';
import { TITLE } from '@/consts';

type Props = {
  children: React.ReactNode;
};

export const ScrollContainer = ({ children }: Props) => {
  const [page, setPage] = useState(0);
  const lastPage = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const titles = Object.entries(TITLE).map((el) => el[1] as string);

  const correctPage = (page: number) => {
    return Math.min(lastPage.current, Math.max(0, page));
  };

  const moveToPage = (container: HTMLElement, nextPage: number) => {
    container.style.top = nextPage * -100 + 'vh';
    setPage(nextPage);
  };

  const handleWheel: React.WheelEventHandler<HTMLDivElement> = useCallback((ev) => {
    let nextPage = page;

    if (ev.deltaY > 0) {
      nextPage += 1;
    }

    if (ev.deltaY < 0) {
      nextPage -= 1;
    }

    nextPage = correctPage(nextPage);

    const target = ev.currentTarget as HTMLElement;
    target.style.top = nextPage * -100 + 'vh';
    setPage(nextPage);
  }, []);

  const handleClickMove = (id: string) => {
    if (containerRef.current) {
      const pages = [...containerRef.current.querySelectorAll('.scroll-page')];
      const nextPage = correctPage(pages.findIndex((el) => el.id === id));
      moveToPage(containerRef.current, nextPage);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      const pages = [...containerRef.current.querySelectorAll('.scroll-page')];
      lastPage.current = pages.length - 1;
    }
  }, []);
  return (
    <div className="scroll-container" ref={containerRef} onWheel={handleWheel}>
      <Titles>
        {titles.map((el) => (
          <Title key={el} id={el} label={el} onClick={handleClickMove} />
        ))}
      </Titles>
      {children}
    </div>
  );
};
