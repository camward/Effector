import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import ProjectOne from "./projects/ProjectOne";
import ProjectTwo from "./projects/ProjectTwo";
import ProjectThree from "./projects/ProjectThree";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="app_header">
          <Header />
        </div>
        <div className="app_body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="one" element={<ProjectOne />} />
            <Route path="two" element={<ProjectTwo />} />
            <Route path="three" element={<ProjectThree />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </div>{" "}
    </BrowserRouter>
  );
};

export default App;
