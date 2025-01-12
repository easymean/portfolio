import { data } from '@/pages/books/data';
import './style.scss';
import { useState, useCallback } from 'react';
import { Carousel } from '@/components/carousel';
import Icon from '@/components/icon';

export const BooksMobile = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cards = [
    ...data.map((el) => ({ id: el.id, content: <Card {...el} imgSrc="" /> })),
  ];

  const [selectedIdx, setSelectedIdx] = useState(0);

  const onClickLeft = useCallback((curIdx: number) => {
    const nextIdx = Math.max(0, curIdx - 1);
    setSelectedIdx(nextIdx);
  }, []);

  const onClickRight = useCallback(
    (curIdx: number) => {
      const nextIdx = Math.min(cards.length - 1, curIdx + 1);
      setSelectedIdx(nextIdx);
    },
    [cards],
  );

  const handleSlide = (nextIdx: number) => {
    setSelectedIdx(nextIdx);
  };

  return (
    <div className="books-mobile">
      <div className="books-wrapper">
        <div className="title">BOOKS</div>
        <div className="carousel-container">
          <Carousel
            items={cards}
            selectedIdx={selectedIdx}
            colWidth={'22rem'}
            onSlide={handleSlide}
          />
          <ul className="carousel-controller">
            <button
              disabled={selectedIdx === 0}
              onClick={() => onClickLeft(selectedIdx)}
            >
              <Icon.chevronLeft />
            </button>
            <button
              disabled={selectedIdx === cards.length - 1}
              onClick={() => onClickRight(selectedIdx)}
            >
              <Icon.chevronRight />
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

type Props = {
  title: string;
  link: string;
  imgSrc: string;
};

const Card = ({ title, link, imgSrc }: Props) => {
  return (
    <div className="book-mobile-card">
      <a className="book-title" href={link} target="_blank">
        {title}
      </a>
    </div>
  );
};
