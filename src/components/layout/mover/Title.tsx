import './style.scss';
type Props = {
  label: string;
  id: string;
};
export const Title = ({ label, id }: Props) => {
  const handleClick = () => {
    const target = document.body.querySelector(`#${id}`);
    target?.scrollIntoView();
  };
  return (
    <li className="title" onClick={handleClick}>
      {label}
    </li>
  );
};
