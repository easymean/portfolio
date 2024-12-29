import './style.scss';
import React from 'react';

type Props = {
  items: ({
    groupId: string;
  } & CardProps)[];
};
export const CardList = React.forwardRef<HTMLUListElement, Props>(
  ({ items = [] }, ref) => {
    return (
      <div className="card-slider">
        <ul className="card-list" ref={ref}>
          {items.map((el) => (
            <Card key={el.groupId + el.id} {...el} />
          ))}
        </ul>
      </div>
    );
  },
);

type CardProps = {
  id: string;
  front: {
    content: React.ReactNode;
  };
  back: {
    content: React.ReactNode;
  };
};
const Card = ({ front, back }: CardProps) => {
  return (
    <li className="card">
      <div className="card-container front">{front.content}</div>
      <div className="card-container back">{back.content}</div>
    </li>
  );
};
