import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import "./css/Global.css";

class BugList extends Component {
  render() {
    return (
      <div className="side-content-container p-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>SUBJECT</th>
              <th>STATUS</th>
              <th>SEVERITY</th>
              <th>DATE OPENED</th>
              <th>DATE CLOSED</th>
              <th>REPORTED BY</th>
              <th>CLOSED BY</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>

              <td>
                <Link to="./bug-list/1">Sidebar displaying on all pages</Link>
              </td>
              <td>OPEN</td>
              <td>LOW</td>
              <td>1/1/2020</td>
              <td>-</td>
              <td>JAKE GLASSON</td>
              <td>-</td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                <Link to="./bug-list/1">Can't login</Link>
              </td>

              <td>OPEN</td>
              <td>HIGH</td>
              <td>1/1/2020</td>
              <td>-</td>
              <td>JOSHUA GILMORE</td>
              <td>-</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default BugList;