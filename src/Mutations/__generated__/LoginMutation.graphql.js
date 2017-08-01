/**
 * @flow
 * @relayHash df7fe9a4a4c31c7e0649d7ada63c56c7
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type LoginMutationVariables = {|
  input: {
    clientMutationId?: ?string;
    email: string;
    password: string;
  };
|};

export type LoginMutationResponse = {|
  +loginUser: ?{|
    +user: ?{|
      +id: string;
    |};
  |};
|};
*/


/*
mutation LoginMutation(
  $input: LoginUserInput!
) {
  loginUser(input: $input) {
    user {
      id
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "LoginUserInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "LoginMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "LoginUserInput!"
          }
        ],
        "concreteType": "LoginUserPayload",
        "name": "loginUser",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "User",
            "name": "user",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              }
            ],
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
  "name": "LoginMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "LoginUserInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "LoginMutation",
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
            "type": "LoginUserInput!"
          }
        ],
        "concreteType": "LoginUserPayload",
        "name": "loginUser",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "User",
            "name": "user",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation LoginMutation(\n  $input: LoginUserInput!\n) {\n  loginUser(input: $input) {\n    user {\n      id\n    }\n  }\n}\n"
};

module.exports = batch;
