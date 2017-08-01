import { commitMutation, graphql } from "react-relay";
import { ConnectionHandler } from "relay-runtime";
import environment from "../Environment";

let tempID = 0;

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

      ConnectionHandler.insertEdgeAfter(todos, edge);
    },

    onError: err => {
      console.error(err);
    }
  });
};

/* OLD STUFF

const configs = [
  {
    type: "RANGE_ADD",
    parentID: "viewerId",
    connectionInfo: [
      {
        key: "TodoList_todos",
        rangeBehavior: "append"
      }
    ],
    edgeName: "todoEdge"
  }
];

    optimisticUpdate: store => {
      const id = "client:newTodo" + tempID++;
      const newTodo = store.create(id, "Todo");
      newTodo.setValue(id, "id");
      newTodo.setValue(title, "title");
      newTodo.setValue(description, "description");
      newTodo.setValue(status, "status");

      const viewerProxy = store.get(viewerId);
      const connection = ConnectionHandler.getConnection(
        viewerProxy,
        "TodoList_todos"
      );
      if (connection) {
        ConnectionHandler.insertEdgeAfter(connection, newTodo);
      }
    },


    */
