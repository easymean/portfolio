import './style.scss';
type Props = {
  label: string;
  id: string;
  onClick: (id: string) => void;
};
export const Title = ({ label, id, onClick }: Props) => {
  const handleClick = () => {
    onClick(id);
  };
  return (
    <li className="title" onClick={handleClick}>
      {label}
    </li>
  );
};
