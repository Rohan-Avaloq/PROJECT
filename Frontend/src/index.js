import React from "react";
import ReactDOM from "react-dom/client";  // Updated import for React 18
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));  // Create a root using createRoot

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
