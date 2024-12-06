import "./style.scss";

type Props = {
  children: React.ReactNode;
};

export const Page = ({ children }: Props) => {
  return <div className="scroll-page">{children}</div>;
};
