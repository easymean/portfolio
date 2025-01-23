import { useEffect, useRef } from 'react';
import './style.scss';

type Props = {
  children: React.ReactNode;
};

const SectionHeader = ({ children }: Props) => {
  const observer = useRef<IntersectionObserver>();
  const observeTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observeTarget.current?.classList.add('fade-in');
        } else {
          observeTarget.current?.classList.remove('fade-in');
        }
      },
      {
        threshold: 1,
      },
    );

    if (observer.current && observeTarget.current) {
      observer.current.observe(observeTarget.current);
      return () => {
        observer.current?.disconnect();
      };
    }
  }, []);

  return (
    <header className="section-header">
      <div className="section-header-wrapper" ref={observeTarget}>
        {children}
      </div>
    </header>
  );
};

const SectionBody = ({ children }: Props) => {
  return <div className="section-body">{children}</div>;
};

const Section = ({ children }: Props) => {
  return <section className="section">{children}</section>;
};

export { Section, SectionHeader, SectionBody };
