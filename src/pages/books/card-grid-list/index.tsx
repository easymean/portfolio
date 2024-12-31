import './style.scss';
import React from 'react';

type Props = {
  items: CardProps[];
};
export const CardList = React.forwardRef<HTMLUListElement, Props>(
  ({ items = [] }, ref) => {
    return (
      <ul className="card-grid-list" ref={ref}>
        {items.map((el) => (
          <Card key={el.id} {...el} />
        ))}
      </ul>
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
const Card = ({ id, front, back }: CardProps) => {
  return (
    <li className="card" id={id}>
      <div className="card-container front">{front.content}</div>
      <div className="card-container back">{back.content}</div>
    </li>
  );
};
