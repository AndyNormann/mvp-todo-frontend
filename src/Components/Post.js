import React from "react";
import { Card, CardHeader } from "material-ui/Card";
import { FlatButton, TableRow, TableRowColumn } from "material-ui";
import { createFragmentContainer, graphql } from "react-relay";

import DeleteMutation from "../Mutations/DeleteMutation";

const PostStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
};

const deleteTodo = id => {
  console.log("deleting id: ", id);
  DeleteMutation(id, err => {
    console.log("hallo?");
    if (err) {
      console.error(err);
      return;
    }
  });
};

const Post = props => {
  return (
    <div style={PostStyle}>
      {props.post.title}
      {props.post.description}
      <FlatButton
        style={{ float: "right" }}
        primary
        label="Delete"
        onTouchTap={() => {
          deleteTodo(props.post.id);
        }}
      />
    </div>
  );
};

export default createFragmentContainer(
  Post,
  graphql`
    fragment Post_post on Todo {
      id
      title
      description
    }
  `
);
