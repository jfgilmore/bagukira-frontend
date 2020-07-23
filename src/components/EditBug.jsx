import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Dropdown, Button, ButtonGroup, Table, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";
import "./css/BugList.css";
import "./css/EditBug.css";
import Axios from "axios";

class BugList extends Component {
  state = {
    renderClosePopup: "",
    bug: "",
    root: "null",
  };
  constructor(props) {
    super(props);
    // console.log("constructor");
    this.state = {
      renderClosePopup: false,
    };
  }

  componentDidMount() {
    console.log(this.props.match.params);
    let { hash, bug_id } = this.props.match.params;
    let route =
      this.props.serverRootUrl +
      "/bugs" +
      "?projectRefHash=" +
      hash +
      "&idInProject=" +
      bug_id;
    console.log("editBug Route:", route);
    Axios.get(route).then((response) => {
      const data = response.data;
      this.setState({ bug: data });
    });

    this.setState({
      root: "/projects/p/" + hash + "/bugs",
    });
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  dropDown = () => {
    return (
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle id="dropdown-custom-1">SET STATUS</Dropdown.Toggle>
        <Dropdown.Menu className="bg-dark">
          <Dropdown.Item eventKey="1" className="eb-open">
            OPEN
          </Dropdown.Item>
          <Dropdown.Item eventKey="2" className="eb-in-progress">
            IN PROGRESS
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="3"
            className="eb-closed"
            onClick={this.handleStatusChange.bind(this, "CLOSED")}
          >
            CLOSED
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  handleStatusChange = (status) => {
    // console.log("executing: ", "handleStatusChange", "- status: ", status);

    switch (status) {
      case "OPEN":
        break;

      case "IN PROGRESS":
        break;

      case "CLOSED":
        // console.log("switch case: CLOSED");
        this.setState({ renderClosePopup: true });
        break;
    }
  };

  handleCancelClose = () => {
    // console.log("executing:", "handleCancelClose");
    this.setState({ renderClosePopup: false });
  };

  dropDownButton = (status, style) => {
    return (
      <Button variant={style} disabled>
        {status}
      </Button>
    );
  };

  renderClosePopup = () => {
    const { renderClosePopup } = this.state;
    // console.log("renderClosePopup: ", renderClosePopup);
    if (renderClosePopup) {
      return (
        <div className="popup-container p-4">
          <div className="popup-content p-4">
            <h1 className="text-center">CLOSING BUG #1</h1>
            <h1 className="text-center">BUG SUBJECT TEXT GOES HERE</h1>
            <Form>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>PLEASE ENTER YOUR NAME</Form.Label>
                <Form.Control as="textarea" rows="3" />
              </Form.Group>
              <Link to={this.state.root}>
                <Button variant="primary" type="submit">
                  CLOSE BUG
                </Button>{" "}
              </Link>

              <Button
                variant="danger"
                onClick={this.handleCancelClose.bind(this, "CLOSED")}
              >
                CANCEL
              </Button>
            </Form>
          </div>
        </div>
      );
    }
  };

  status = (status) => {
    let style;
    switch (status) {
      case "OPEN":
        style = "outline-danger";
        break;

      case "IN PROGRESS":
        style = "outline-warning";
        break;

      case "CLOSED":
        style = "outline-success";
        break;
    }

    return this.dropDownButton(status, style);
  };

  renderBug = () => {
    let { bug } = this.state;

    if (bug) {
      bug = bug[0];
      console.log(bug);
      return (
        <div>
          <h6>
            <Link to={this.state.root}>BUG LIST</Link>{" "}
            {"> BUG #" + bug.idInProject}
          </h6>

          <h3>{bug.subject}</h3>
          <div className="eb-grid-container">
            <div className="eb-info">
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>BUG #{bug.idInProject}</th>
                    <th>
                      {this.status(bug.status.toUpperCase())} {this.dropDown()}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>DATE OPENED</td>
                    <td>{bug.created_at}</td>
                  </tr>
                  <tr>
                    <td>DATE CLOSED</td>
                    <td>{bug.closed_at}</td>
                  </tr>
                  <tr>
                    <td>REPORTED BY</td>
                    <td>{bug.reported_by}</td>
                  </tr>
                  <tr>
                    <td>CLOSED BY</td>
                    <td>{bug.closed_by}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className="eb-image display-1">
              <FontAwesomeIcon icon={faBug} style={{ color: "orange" }} />
            </div>
            <div className="eb-description-entry">
              <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>BUG DESCRIPTION</Form.Label>
                  <Form.Control as="textarea" rows="3" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="side-content-container p-4">
        {this.renderBug()}
        {this.renderClosePopup()}
      </div>
    );
  }
}

export default BugList;
