import React from "react";
import "./styles/index.css";

export default function Index() {
  return (
    <div className="container">
      <h1>Welcome to My Portfolio</h1>
      <p>This is a simple portfolio page built with React.</p>
      <p>Feel free to explore my projects and skills.</p>
      <footer>
        <p>&copy; {new Date().getFullYear()} My Portfolio</p>
      </footer>
    </div>
  );
}