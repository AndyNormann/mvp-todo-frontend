import { commitMutation, graphql } from "react-relay";
import { ConnectionHandler } from "relay-runtime";
import environment from "../Environment";

const mutation = graphql`
  mutation StatusMutation($input: UpdateTodoInput!) {
    updateTodo(input: $input) {
      todo {
        title
        description
        id
      }
    }
  }
`;

export default (todoID, title, description, status, owner, callback) => {
  const variables = {
    input: {
      todoID,
      title,
      description,
      status
    }
  };

  commitMutation(environment, {
    mutation: mutation,
    variables: variables,
    onCompleted: (response, error) => {
      callback(error);
    },
    updater: store => {
      const addTodoField = store.getRootField("updateTodo");
      const newTodo = addTodoField.getLinkedRecord("todo");
      newTodo.setValue(status, "status", status);
    },
    onError: err => {
      console.error(err);
    }
  });
};
