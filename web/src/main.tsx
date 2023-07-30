import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import { Layout } from "./components/Layout";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Layout>
    <App />
  </Layout>
);
