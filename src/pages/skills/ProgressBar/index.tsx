import './style.scss';
type Props = {
  id: string;
  label: string;
  value: string;
};

export const ProgressBar = ({ id, label, value }: Props) => {
  return (
    <div className="skill-progress-bar">
      <label htmlFor={id}>{label}</label>
      <progress id={id} max="100" value={value}></progress>
    </div>
  );
};
