import { commitMutation, graphql } from "react-relay";
import { ConnectionHandler } from "relay-runtime";
import environment from "../Environment";

const mutation = graphql`
  mutation AddMutation($input: AddTodoInput!) {
    addTodo(input: $input) {
      todo {
        title
        description
        status
      }
    }
  }
`;

export default (title, description, status, viewerId, callback) => {
  const variables = {
    input: {
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
      const addTodoField = store.getRootField("addTodo");
      const newTodo = addTodoField.getLinkedRecord("todo");

      const viewer = store.getRoot().getLinkedRecord("viewer");

      const todos = ConnectionHandler.getConnection(viewer, "TodoList_todos");

      const edge = ConnectionHandler.createEdge(
        store,
        todos,
        newTodo,
        "TodoEdge"
      );

      ConnectionHandler.insertEdgeBefore(todos, edge);
    },

    onError: err => {
      console.error(err);
    }
  });
};
