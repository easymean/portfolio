import './style.scss';
type Props = {
  title: string;
  className?: string;
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

export const Card = ({ title, className, children, header, footer }: Props) => {
  return (
    <div className={`card ${className}`}>
      <div className="card-header">{header}</div>
      <div className="card-body">
        <div className="card-title">{title}</div>
        {children}
      </div>
      <div className="card-footer">{footer}</div>
    </div>
  );
};
