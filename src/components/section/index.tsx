import { useEffect, useRef } from 'react';
import './style.scss';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const SectionHeader = ({ children, className }: Props) => {
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
    <header className={`section-header ${className}`}>
      <div className="section-header-wrapper" ref={observeTarget}>
        {children}
      </div>
    </header>
  );
};

const SectionBody = ({ children, className }: Props) => {
  return <div className={`section-body ${className}`}>{children}</div>;
};

const Section = ({ children, className }: Props) => {
  return <section className={`section ${className}`}>{children}</section>;
};

export { Section, SectionHeader, SectionBody };
