import React, { Component } from "react";
import '../src/components/css/style.css'
import Home from '../src/components/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./project-ui/Dashboard";
import PostProjectForm from "./project-ui/PostProjectForm";

class App extends Component {

  render() {

    return (
      <>

        <BrowserRouter >
          <Routes>
            <Route exact path="/" element={<Home />} />
              <Route exact path="/Dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter >

      </>
    );
  }
}

export default App;
