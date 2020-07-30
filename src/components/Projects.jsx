import React, { Component } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import "./css/Global.css";
import "./css/Projects.css";

class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
    };
  }

  async componentWillMount() {
    if (this.props.authorized == false) {
      alert("You are not authorized to access this resource");
      this.props.history.push("/");
      window.location.reload(true);
    }

    await axios
      .get(
        process.env.REACT_APP_API_URL +
          "/users/" +
          this.state.userId +
          "/units",
        {
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;
        this.setState({ projects: data.units });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  newProject = () => {
    return (
      <Button
        href="/projects/new"
        data-testid={`NEW PROJECT`}
        className="projects-item-container"
        variant="success"
        size="lg"
        block
      >
        <div className="projects-item">NEW PROJECT</div>
      </Button>
    );
  };

  storeHash(event, hash) {
    localStorage.setItem("hash", hash);
  }

  existingProjects = () => {
    const { projects } = this.state;
    return (
      <>
        {projects &&
          projects.map((project, index) => {
            return (
              <Button
                key={index}
                data-testid={`EXISTING PROJECT${index}`}
                href={"/projects/p/" + project.id + "/bugs"}
                className="projects-item-container"
                variant="warning"
                size="lg"
                block
                onClick={(event) => {
                  this.storeHash(event, project.id);
                }}
              >
                <div className="projects-item word-wrap-anywhere">
                  {project.name}
                </div>
              </Button>
            );
          })}
      </>
    );
  };

  render() {
    return (
      <>
        <h1 className="text-center m-3">ALL PROJECTS</h1>
        <div className="projects-grid-container p-3">
          {this.newProject()}
          {this.existingProjects()}
        </div>
      </>
    );
  }
}

export default Projects;
