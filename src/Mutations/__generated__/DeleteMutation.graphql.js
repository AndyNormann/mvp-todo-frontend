/**
 * @flow
 * @relayHash 24f22fcf340bfccd74649aaa9f8c786e
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type DeleteMutationVariables = {|
  input: {
    todoID: string;
    clientMutationId?: ?string;
  };
|};

export type DeleteMutationResponse = {|
  +deleteTodo: ?{|
    +deletedTodoID: ?string;
  |};
|};
*/


/*
mutation DeleteMutation(
  $input: DeleteTodoInput!
) {
  deleteTodo(input: $input) {
    deletedTodoID
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "DeleteTodoInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "DeleteMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "DeleteTodoInput!"
          }
        ],
        "concreteType": "DeleteTodoPayload",
        "name": "deleteTodo",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "deletedTodoID",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "DeleteMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "DeleteTodoInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "DeleteMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "DeleteTodoInput!"
          }
        ],
        "concreteType": "DeleteTodoPayload",
        "name": "deleteTodo",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "deletedTodoID",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation DeleteMutation(\n  $input: DeleteTodoInput!\n) {\n  deleteTodo(input: $input) {\n    deletedTodoID\n  }\n}\n"
};

module.exports = batch;
