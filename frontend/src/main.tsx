import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <QueryClientProvider client={queryClient}>
        <Router>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </Router>
      </QueryClientProvider>
    </MantineProvider>
  </React.StrictMode>
);
