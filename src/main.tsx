import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css"
import Home from "./pages/Home";
import Router from "./components/Router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router />
);
