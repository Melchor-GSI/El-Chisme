import { ReactNode } from "react";

export type DataProps = {
  title: string;
  value: ReactNode;
};

export const Data = ({ title, value }: DataProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <span className="font-bold text-right">{title}</span>
      <span>{value}</span>
    </div>
  );
};
