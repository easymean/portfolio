import './style.scss';
type Props = {
  title: string;
  description: string;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

export const Card = ({
  title,
  description,
  className,
  header,
  footer,
}: Props) => {
  return (
    <div className={`card ${className}`}>
      <div className="card-header">{header}</div>
      <div className="card-body">
        <div className="card-title">{title}</div>
        <p className="card-description">{description}</p>
      </div>
      <div className="card-footer">{footer}</div>
    </div>
  );
};
