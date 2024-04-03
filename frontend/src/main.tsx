import ReactDOM from "react-dom/client";
import { App } from "@/app";
import "./index.css";
import { Toaster } from "@/shared/ui/toaster";

ReactDOM.createRoot(document.getElementById("root")!).render(<><App /><Toaster /></>);