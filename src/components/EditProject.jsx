import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { inputEventState } from "./shared/Helpers.jsx";

import "./css/NewBug.css";
import "./css/EditProject.css";
import "./css/Global.css";

class EditProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      projectId: "",
      redirect: false,
      render: false,
      hash: this.props.match.params.hash,
    };
  }

  componentWillMount = () => {
    if (!localStorage.userId) {
      alert("You are not authorized to access this resource");
      this.props.history.push("/");
      window.location.reload(true);
    }

    this.setState({ projectName: localStorage.projectName });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);

    if (this.validateProjectName()) {
      this.updateProjectName();
    }
  };

  validateProjectName = () => {
    var letters = /^[0-9a-zA-Z]+$/;
    let projectName = this.state.projectName.replace(/\s+/g, ""); // remove spaces for regex check
    if (projectName.match(letters)) {
      // alert("Project name has been updated");
      return true;
    } else {
      alert("Invalid project name, project names may only be alphanumeric");
      return false;
    }
  };

  updateProjectName = () => {
    let projectName = this.state.projectName;
    let hash = this.props.match.params.hash;
    let route = `${process.env.REACT_APP_API_URL}/units/${hash}`;

    if (projectName.length > 40) {
      alert("Project name is too long, 40 character limit");
      return;
    }

    let data = JSON.stringify({
      unit: {
        name: projectName.toUpperCase(),
      },
    });

    let config = {
      method: "patch",
      url: route,
      headers: {
        Authorization: "Bearer " + localStorage.token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        localStorage.setItem("projectName", projectName);
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  onInputChange = (event) => inputEventState(this, event);

  renderEditProjectForm = () => {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label>PROJECT NAME</Form.Label>
          <Form.Control
            id="projectName"
            type="text"
            placeholder="PROJECT NAME"
            value={this.state.projectName.toUpperCase()}
            onChange={this.onInputChange}
          />
        </Form.Group>

        <input
          type="submit"
          value="SUBMIT"
          className="btn btn-block btn-primary"
        />
      </Form>
    );
  };

  handleRedirect = () => {
    if (this.state.redirect) {
      return (
        <Redirect
          to={"/projects/p/" + this.props.match.params.hash + "/bugs"}
        />
      );
    }
  };

  renderContent = () => {
    if (localStorage.userId === localStorage.projectOwnerId) {
      return (
        <div className="p-4 global-form-container">
          <h2 className="text-center">EDIT PROJECT</h2>
          {this.renderEditProjectForm()}
        </div>
      );
    }
  };

  render() {
    return (
      <div className="side-content-container p-4">
        {/* {this.handleRedirect()} */}
        {this.renderContent()}
      </div>
    );
  }
}

export default EditProject;
