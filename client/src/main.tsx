import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./utils/AuthProvider.tsx";
import { Toaster } from "./components/ui/toaster.tsx"
import { BrowserRouter as Router } from "react-router-dom";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <App />
        <Toaster />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
