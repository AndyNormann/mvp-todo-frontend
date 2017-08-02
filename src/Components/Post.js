import React from "react";
import { FlatButton, TextField } from "material-ui";
import { createFragmentContainer, graphql } from "react-relay";

import DeleteMutation from "../Mutations/DeleteMutation";
import StatusMutation from "../Mutations/StatusMutation";

const PostStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
};

const deleteTodo = id => {
  DeleteMutation(id, err => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

const editTitle = (post, title) => {
  StatusMutation(
    post.id,
    title,
    post.description,
    post.status,
    post.owner,
    err => {
      if (err) {
        console.error(err);
      }
    }
  );
};

const editDescription = (post, description) => {
  StatusMutation(
    post.id,
    post.title,
    description,
    post.status,
    post.owner,
    err => {
      if (err) {
        console.error(err);
      }
    }
  );
};

class TitleAndDescriptionField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.post.title,
      description: props.post.description
    };
  }

  render() {
    return (
      <div>
        <TextField
          value={this.state.title}
          name="title"
          underlineShow={false}
          onChange={event => {
            this.setState({ title: event.target.value });
          }}
          onBlur={() => {
            editTitle(this.props.post, this.state.title);
          }}
        />
        <TextField
          value={this.state.description}
          name="description"
          underlineShow={false}
          onChange={event => {
            this.setState({ description: event.target.value });
          }}
          onBlur={() => {
            editDescription(this.props.post, this.state.description);
          }}
        />
      </div>
    );
  }
}

const Post = props => {
  return (
    <div style={PostStyle}>
      <TitleAndDescriptionField post={props.post} />
      <div>
        <FlatButton
          primary
          label="Delete"
          onTouchTap={() => {
            deleteTodo(props.post.id);
          }}
        />
      </div>
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
