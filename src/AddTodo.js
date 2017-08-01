import React from "react";
import AddMutation from "./Mutations/AddMutation";

import { RaisedButton, Dialog, TextField } from "material-ui";

import Add from "material-ui/svg-icons/content/add";

class AddTodo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      title: "",
      description: ""
    };
  }

  handleClose = () => {
    this.setState({ open: false });
  };
  handleOpen = () => {
    this.setState({ open: true });
  };

  addTodo = () => {
    let { title, description } = this.state;
    if (title === "" || description === "") {
      return;
    }

    AddMutation(title, description, false, this.props.viewerID, err => {
      if (err) {
        console.error(err);
        return;
      }
      this.handleClose();
    });
  };

  render() {
    const actions = [
      <RaisedButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <RaisedButton label="Submit" primary={true} onTouchTap={this.addTodo} />
    ];
    return (
      <div>
        <RaisedButton
          primary
          icon={<Add />}
          style={{ width: "100%" }}
          onTouchTap={this.handleOpen}
        />
        <Dialog
          title="Add Todo"
          modal={true}
          actions={actions}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            floatingLabelText="Title"
            onChange={(_, val) => {
              this.setState({ title: val });
            }}
          />
          <TextField
            floatingLabelText="Description"
            onChange={(_, val) => {
              this.setState({ description: val });
            }}
          />
        </Dialog>
      </div>
    );
  }
}

export default AddTodo;
