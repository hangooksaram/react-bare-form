import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Test from "./components/Form.test";
import "./common.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Test />
  </StrictMode>
);
