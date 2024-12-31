import { useEffect, useRef } from 'react';
import './style.scss';

export const Infro = () => {
  const container = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver>();
  useEffect(() => {
    observer.current = new IntersectionObserver(
      ([entry]) => {
        const divs = [
          ...(container.current?.querySelectorAll('.title') ?? []),
        ] as HTMLElement[];
        if (entry.isIntersecting) {
          divs.forEach((el, idx) => {
            el.classList.remove(`move-in-${idx + 1}`);
            el.classList.add(`move-out`);
          });
        } else {
          divs.forEach((el, idx) => {
            el.classList.add(`move-in-${idx + 1}`);
            el.classList.remove(`move-out`);
          });
        }
      },
      {
        threshold: 0.2,
      },
    );

    const next = document.querySelector('.skills');
    if (next) {
      observer.current?.observe(next);
    }
    return () => {
      observer.current?.disconnect();
    };
  }, []);

  return (
    <div className="about" ref={container}>
      <div className="title-wrapper">
        <div className="title stroke move-in-1">Frontend Developer</div>
        <div className="title move-in-2">LEE JIMIN</div>
      </div>
    </div>
  );
};
