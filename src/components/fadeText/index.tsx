import { useEffect, useState } from 'react';
import './style.scss';

type Props = {
  text: string;
  classname?: string;
};

export const FadeText = ({ text, classname }: Props) => {
  const [transitionClass, setTransitionClass] = useState('');

  useEffect(() => {
    setTransitionClass('fade-out');
    if (text.length > 0) {
      const timeout = setTimeout(() => setTransitionClass(`fade-in`), 100);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [text]);
  return (
    <div className={`${classname} fade-text ${transitionClass}`}>{text}</div>
  );
};
