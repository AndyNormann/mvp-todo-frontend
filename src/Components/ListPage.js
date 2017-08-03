import React from "react";
import Post from "./Post";
import TopBar from "./TopBar";
import { createRefetchContainer, graphql } from "react-relay";
import {
  Paper,
  Divider,
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  Checkbox
} from "material-ui";
import AddTodo from "../AddTodo";
import StatusMutation from "../Mutations/StatusMutation";

const ContainerStyle = {
  margin: "15px"
};

const changeTodoStatus = node => {
  StatusMutation(
    node.id,
    node.title,
    node.description,
    !node.status,
    node.owner,
    err => {
      if (err) {
        console.error(err);
      }
    }
  );
};

class ListPage extends React.Component {
  loadMoreOnScroll = () => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this._loadMore(10);
    } else {
      console.log("now we here");
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.loadMoreOnScroll);
  }
  componentDidUnmount() {
    window.removeEventListener("scroll", this.loadMoreOnScroll);
  }

  _loadMore(count) {
    const { todos } = this.props.viewer;
    if (!todos.pageInfo.hasNextPage) return;

    const { endCursor } = todos.pageInfo;

    const total = todos.edges.length + count;

    const refetchVariables = fragmentVariables => {
      return {
        ...fragmentVariables,
        count: count,
        cursor: endCursor
      };
    };

    const renderVariables = {
      count: total,
      cursor: endCursor
    };

    /*     const refetchVariables = (fragmentVariables) = {
      ...fragmentVariables
    } */

    this.props.relay.refetch(
      refetchVariables,
      renderVariables,
      error => {
        console.log("enreachedk", error);
      },
      {
        force: false
      }
    );
  }

  render() {
    return (
      <div>
        <TopBar />
        <Paper zDepth={0} style={ContainerStyle}>
          <Table multiSelectable={false} style={{ overflow: "scroll" }}>
            <TableBody
              displayRowCheckbox={false}
              showRowHover={true}
              deselectOnClickaway={false}
            >
              <TableRow>
                <TableRowColumn colSpan="6">
                  <AddTodo viewerID={this.props.viewer.id} />
                </TableRowColumn>
              </TableRow>
              {this.props.viewer.todos.edges.map(({ node }) => {
                return (
                  <TableRow selectable={false}>
                    <TableRowColumn
                      colSpan="1"
                      onTouchTap={() => {
                        changeTodoStatus(node);
                      }}
                    >
                      <Checkbox switched={false} checked={node.status} />
                    </TableRowColumn>
                    <TableRowColumn colSpan="5">
                      <Post key={node.__id} post={node} />
                    </TableRowColumn>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Divider />
        </Paper>
      </div>
    );
  }
}

export default createRefetchContainer(
  ListPage,
  {
    viewer: graphql.experimental`
      fragment ListPage_viewer on User
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 1000 }
          cursor: { type: "String" }
        ) {
        id
        todos(first: $count, after: $cursor)
          @connection(key: "TodoList_todos") {
          edges {
            node {
              id
              status
              ...Post_post
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `
  },
  graphql.experimental`
    query ListPageRefetchQuery($count: Int, $cursor: String) {
      viewer {
        ...ListPage_viewer @arguments(count: $count, cursor: $cursor)
      }
    }
  `
);

/*
export default createPaginationContainer(
  ListPage,
  {
    viewer: graphql`
      fragment ListPage_viewer on User {
        id
        todos(first: $count, after: $cursor)
          @connection(key: "TodoList_todos") {
          edges {
            node {
              id
              status
              ...Post_post
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      console.log("running getConnectionFromProps with props: ", props);
      //return props.viewer && props.viewer.edges;
      return props.viewer.todos;
    },
    getFragmentVariables(prevVars, totalCount) {
      console.log("running getFragmentVariables");
      return {
        ...prevVars,
        count: totalCount
      };
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      console.log("running getVariables");
      return {
        count: 10,
        cursor: ""
        //cursor: "YXJyYXljb25uZWN0aW9uOjA="
      };
    },
    query: graphql`
      query ListPagePaginationQuery($count: Int!, $cursor: String) {
        viewer {
          ...ListPage_viewer
        }
      }
    `
  }
);
*/

/*



export default createFragmentContainer(
  ListPage,
  graphql`
    fragment ListPage_viewer on User {
      id
      todos(last: 10) @connection(key: "TodoList_todos") {
        edges {
          node {
            id
            status
            ...Post_post
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  `
);

*/
