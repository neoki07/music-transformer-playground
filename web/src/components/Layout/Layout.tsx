import { ReactNode } from "react";
import { Providers } from "./Providers";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Providers>
      <div className="flex flex-col items-center min-h-screen font-inter">
        <header className="h-16" />

        <main className="flex-1 flex flex-col">{children}</main>

        <footer className="h-16 flex justify-center items-center border-t w-full text-slate-700 text-sm">
          <span>
            Built by{" "}
            <a
              className="text-black underline underline-offset-4"
              href="https://github.com/ot07"
              target="_blank"
            >
              ot07
            </a>
            . The source code is available on{" "}
            <a
              className="text-black underline underline-offset-4"
              href="https://github.com/ot07/music-transformer-playground"
              target="_blank"
            >
              GitHub
            </a>
            .
          </span>
        </footer>
      </div>
    </Providers>
  );
}
