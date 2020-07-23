import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Route, Link, NavLink } from "react-router-dom";
import "../css/Global.css";
import "../css/SideBar.css";
import { Button, Nav } from "react-bootstrap";

class SideBar extends Component {
  state = {
    root: null,
  };
  componentDidMount = () => {
    console.log(this.props);

    let { serverRootUrl } = this.props;
    let { hash } = this.props.match.params;
    let endPoint = "/projects";
    let queries = "?hashId=" + hash;

    this.setState({
      root: "/projects/p/" + hash + "/",
    });

    axios.get(serverRootUrl + endPoint + queries).then((response) => {
      console.log(response);
      console.log(response.data);
    });
  };

  checkLinkIsActive = (route) => {
    if (route == this.props.activeLink) {
      return "selected";
    }
  };

  renderLink = (endPoint, linkName) => {
    let { root } = this.state;
    if (root) {
      return (
        <Link to={root + endPoint}>
          <div className={this.checkLinkIsActive(endPoint) + " sideBarLink"}>
            {linkName}
          </div>
        </Link>
      );
    }
  };

  render() {
    return (
      <div className="side-bar-container">
        <Nav defaultActiveKey="/home" className="flex-column sidebar">
          <h3>Project Name</h3>
          {this.renderLink("bugs", "BUG LIST")}

          {this.renderLink("bugs/new", "NEW BUG")}

          {this.renderLink("user/add", "ADD USER")}

          {this.renderLink("edit", "EDIT PROJECT")}
        </Nav>
      </div>
    );
  }
}

export default SideBar;
