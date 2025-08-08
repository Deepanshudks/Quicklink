import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { registerSW } from "virtual:pwa-register";

registerSW({
  onNeedRefresh() {
    if (confirm("New version available. Refresh now?")) {
      window.location.reload();
    }
  },
  onOfflineReady() {
    console.log("App is ready to work offline!");
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
