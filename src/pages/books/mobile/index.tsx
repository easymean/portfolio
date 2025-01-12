import { data } from '@/pages/books/data';
import './style.scss';
import { useState, useCallback } from 'react';
import { Carousel } from '@/components/carousel';
import Icon from '@/components/icon';
import { Card } from '@/components/card';

export const BooksMobile = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const cards = data.map((el) => ({
    id: el.id,
    content: (
      <Card className="book-mobile-card" title={el.title} footer={<></>}></Card>
    ),
  }));

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
      <div className="books-mobile-wrapper">
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

// type Props = {
//   title: string;
//   link: string;
//   imgSrc: string;
// };

// const Card = ({ title, link, imgSrc }: Props) => {
//   return (
//     <div className="book-mobile-card">
//       <div className="book-title">{title}</div>
//       <img src={imgSrc} />
//       <button target="_blank" ><button/>
//     </div>
//   );
// };
