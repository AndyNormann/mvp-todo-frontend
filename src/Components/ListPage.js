import React from "react";
import Post from "./Post";
import { createFragmentContainer, graphql } from "react-relay";
import {
  Paper,
  Divider,
  Table,
  TableBody,
  TableRow,
  TableRowColumn
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
        console.log("hallo???");
        console.error(err);
      }
    }
  );
};

const ListPage = props => {
  return (
    <Paper zDepth={2} style={ContainerStyle}>
      <h1 style={{ textAlign: "center", paddingTop: "20px" }}>Todos</h1>
      <Divider />
      <Table multiSelectable={true}>
        <TableBody
          displayRowCheckbox={true}
          showRowHover={true}
          deselectOnClickaway={false}
        >
          {props.viewer.todos.edges.map(({ node }) => {
            return (
              <TableRow
                selected={node.status}
                onTouchTap={() => {
                  changeTodoStatus(node);
                }}
              >
                <TableRowColumn>
                  <Post key={node.__id} post={node} />
                </TableRowColumn>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Divider />
      <AddTodo viewerID={props.viewer.id} />
    </Paper>
  );
};

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
