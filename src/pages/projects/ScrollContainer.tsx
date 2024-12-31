import './style.scss';
import { useEffect, useRef } from 'react';

type Props = {
  projects: {
    id: string;
    content: JSX.Element;
  }[];
  observeTargetIds: string[];
  isIntersecting: (projectId: string) => void;
};

export const ScrollContainer = ({
  projects,
  observeTargetIds,
  isIntersecting,
}: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    const rootContainer = rootRef.current;
    if (rootContainer) {
      observer.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            isIntersecting(entry.target.id);
          }
        },
        {
          // rootMargin: '50% 0px -50% 0px',
          threshold: [1],
        },
      );
    }

    const observeTargets = observeTargetIds.reduce((acc, id) => {
      const el = scrollRef.current?.querySelector(`#${id}`);
      return el ? [...acc, el] : acc;
    }, new Array<Element>());

    observeTargets.map((target) => observer.current?.observe(target));

    return () => {
      observer.current?.disconnect();
    };
  }, [observeTargetIds, isIntersecting]);
  return (
    <div className="scroll-container" ref={scrollRef}>
      <div className="hidden" ref={rootRef} />
      {projects.map((el) => (
        <div key={el.id} id={el.id} className="project-card">
          {el.content}
        </div>
      ))}
    </div>
  );
};
