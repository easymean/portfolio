import React from 'react';
import { FadeText } from './FadeText';
import './style.scss';

type Props = {
  company: string;
  group: string;
};

export const StickyContent = React.forwardRef<HTMLDivElement, Props>(
  ({ company, group }, ref) => {
    return (
      <div className="sticky-content" ref={ref}>
        <div className="text-list">
          <FadeText text={company} classname="company" />
          <FadeText text={group} classname="group" />
        </div>
      </div>
    );
  },
);
