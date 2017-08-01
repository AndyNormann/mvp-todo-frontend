import React, { Component } from "react";
import "./App.css";
import ListPage from "./Components/ListPage";
import { graphql, QueryRenderer } from "react-relay";
import { Link, browserHistory } from "react-router";

import environment from "./Environment";

const ViewerQuery = graphql`
  query AppQuery {
    viewer {
      ...ListPage_viewer
    }
  }
`;

class App extends Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={ViewerQuery}
        render={({ error, props }) => {
          if (error) {
            return (
              <div>
                {error.message}
              </div>
            );
          } else if (props) {
            return (
              <div>
                {props.viewer
                  ? <ListPage viewer={props.viewer} />
                  : browserHistory.push("/login")}
              </div>
            );
          }
          return <div>Loading</div>;
        }}
      />
    );
  }
}

export default App;
