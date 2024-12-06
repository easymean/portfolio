import { useCallback, useEffect, useRef, useState } from "react";
import "./style.scss";

type Props = {
  children: React.ReactNode;
};

export const ScrollContainer = ({ children }: Props) => {
  const [page, setPage] = useState(0);
  const lastPage = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleWheel: React.WheelEventHandler<HTMLDivElement> = useCallback(
    (ev) => {
      let nextPage = page;

      if (ev.deltaY > 0) {
        nextPage += 1;
      }

      if (ev.deltaY < 0) {
        nextPage -= 1;
      }

      if (nextPage < 0) {
        nextPage = 0;
      }

      if (nextPage > lastPage.current) {
        nextPage = lastPage.current;
      }

      const target = ev.currentTarget as HTMLElement;
      target.style.top = nextPage * -100 + "vh";
      setPage(nextPage);
    },
    []
  );

  useEffect(() => {
    if (containerRef.current) {
      const pages = [...containerRef.current.querySelectorAll(".scroll-page")];
      lastPage.current = pages.length;
    }
  }, []);
  return (
    <div className="scroll-container" ref={containerRef} onWheel={handleWheel}>
      {children}
    </div>
  );
};
