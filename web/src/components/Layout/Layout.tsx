import { ReactNode } from "react";
import { Providers } from "./Providers";

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
}

export function Layout({ children, showHeader }: LayoutProps) {
  return (
    <Providers>
      <div className="h-screen overflow-hidden">
        {showHeader && (
          <header className="fixed top-0 flex justify-center items-center w-full p-8">
            <h1 className="text-5xl font-cal-sans text-center">
              Music Transformer
              <br />
              Playground
            </h1>
          </header>
        )}

        <main>{children}</main>

        <footer className="fixed bottom-0 flex justify-center items-center w-full p-8">
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
