import './style.scss';
type Props = {
  title: string;
  id?: string;
  className?: string;
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

export const Card = ({
  title,
  id,
  className,
  children,
  header,
  footer,
}: Props) => {
  return (
    <div className={`card ${className}`} id={id}>
      <div className="card-header">{header}</div>
      <div className="card-body">
        <div className="card-title">{title}</div>
        {children}
      </div>
      <div className="card-footer">{footer}</div>
    </div>
  );
};
