import './style.scss';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
  items: { id: string; label: string; content: React.ReactNode }[];
  onClickItem: (id: string) => void;
};

export const Tab = ({ items, onClickItem }: Props) => {
  const listRef = useRef<HTMLUListElement>(null);
  const activeItemRef = useRef<HTMLLIElement>(null);
  const [selectedId, setSelectedId] = useState<string>(items[0].id);

  const setIndicator = (target: HTMLElement) => {
    if (listRef.current) {
      const listWidth = listRef.current.offsetWidth;
      const { offsetLeft, offsetWidth } = target;
      const left = ((offsetLeft / listWidth) * 100).toFixed();
      const right = (
        100 -
        ((offsetLeft + offsetWidth) / listWidth) * 100
      ).toFixed();
      listRef.current.style.setProperty(
        '--clip-path',
        `inset(0 ${right}% 0 ${left}%)`,
      );
    }
  };

  const handleClick = (id: string) => {
    setSelectedId(id);
    onClickItem(id);
  };

  useEffect(() => {
    if (activeItemRef.current) {
      const item = activeItemRef.current;
      setIndicator(item);
      window.addEventListener('resize', () => setIndicator(item));
      return () => {
        window.removeEventListener('resize', () => setIndicator(item));
      };
    }
  }, [selectedId]);
  return (
    <div className="tab">
      <ul className="tab-list" role="tablist" ref={listRef}>
        {items.map((el) => (
          <li
            key={el.id}
            id={el.id}
            className="tab-item"
            ref={el.id === selectedId ? activeItemRef : null}
            aria-selected={el.id === selectedId}
            onClick={() => handleClick(el.id)}
          >
            {el.label}
          </li>
        ))}
      </ul>
      <div role="tabpanel">
        {items.map((el) => (
          <div
            key={`panel-${el.id}`}
            id={el.id}
            className="tab-panel"
            hidden={el.id !== selectedId}
          >
            {el.content}
          </div>
        ))}
      </div>
    </div>
  );
};
