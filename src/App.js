import React, { Component } from "react";
import "./App.css";
import ListPage from "./Components/ListPage";
import { graphql, QueryRenderer } from "react-relay";
import CircularProgress from "material-ui/CircularProgress";

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
        variables={{
          count: 10,
          cursor: ""
        }}
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
                <ListPage viewer={props.viewer} />
              </div>
            );
          }
          return (
            <CircularProgress
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            />
          );
        }}
      />
    );
  }
}

//{props.viewer ? <ListPage /> : browserHistory.push("/login")}
export default App;
