import { type FC, type ReactNode } from "react";

interface MainLayoutProps {
  title: string;
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ title, children }) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};
