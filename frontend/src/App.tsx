import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import routes from "~react-pages";

export function App(): JSX.Element {
  return <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>;
}
