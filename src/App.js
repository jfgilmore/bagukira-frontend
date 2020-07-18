import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Projects from "./components/Projects";
import NewProject from "./components/NewProject";
import NavBar from "./components/shared/NavBar";
import SideBar from "./components/shared/SideBar";
import "./App.css";
import { Nav } from "react-bootstrap";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="text-center display-1 py-3 banner-text">
          <Link to="/" className="text-link">
            <FontAwesomeIcon icon={faBug} style={{ color: "orange" }} />{" "}
            Bagukira{" "}
            <FontAwesomeIcon icon={faBug} style={{ color: "orange" }} />
          </Link>
        </div>
        <Route path="/projects" component={NavBar} />
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/projects/new" component={NewProject} />
        <Route path="/projects/p/:id">
          <div className="content-container">
            <SideBar />
          </div>
        </Route>
      </BrowserRouter>
    );
  }
}

export default App;
