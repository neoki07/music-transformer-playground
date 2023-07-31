import { ReactNode } from "react";
import { Providers } from "./Providers";

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
}

export function Layout({ children, showHeader }: LayoutProps) {
  return (
    <Providers>
      <div className="h-screen min-h-[50rem] min-w-[56rem] flex flex-col">
        <header className="flex justify-center items-start w-full h-36 pt-8">
          {showHeader && (
            <h1 className="text-5xl font-cal-sans text-center">
              Music Transformer
              <br />
              Playground
            </h1>
          )}
        </header>

        <main className="flex-1">{children}</main>

        <footer className="flex justify-center items-end w-full h-36 pb-8">
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
