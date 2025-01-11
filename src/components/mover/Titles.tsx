import './style.scss';

type Props = {
  children: React.ReactNode;
};

export const Titles = ({ children }: Props) => {
  return (
    <div className="titles">
      <ul>{children}</ul>
    </div>
  );
};
