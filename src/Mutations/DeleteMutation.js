import { commitMutation, graphql } from "react-relay";
import { ConnectionHandler } from "relay-runtime";
import environment from "../Environment";

const mutation = graphql`
  mutation DeleteMutation($input: DeleteTodoInput!) {
    deleteTodo(input: $input) {
      deletedTodoID
    }
  }
`;

export default (todoID, callback) => {
  const variables = {
    input: {
      todoID
    }
  };

  commitMutation(environment, {
    mutation: mutation,
    variables: variables,
    onCompleted: (response, error) => {
      callback(error);
    },
    updater: store => {
      const viewer = store.getRoot().getLinkedRecord("viewer");
      const connection = ConnectionHandler.getConnection(
        viewer,
        "TodoList_todos"
      );
      ConnectionHandler.deleteNode(connection, todoID);
    },
    onError: err => {
      console.error(err);
    }
  });
};
