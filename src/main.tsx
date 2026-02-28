import { createRoot } from "react-dom/client";
import App from "./app/App.tsx"; // default export
import "./styles/index.css";
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

createRoot(document.getElementById("root")!).render(<App />);