import './style.scss';

type Props = {
  id: string;
  children: React.ReactNode;
};

export const Page = ({ id, children }: Props) => {
  return (
    <div id={id} className="scroll-page">
      {children}
    </div>
  );
};
