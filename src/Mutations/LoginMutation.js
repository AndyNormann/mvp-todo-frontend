import { commitMutation, graphql } from "react-relay";
import { Connectionhandler } from "relay-runtime";
import environment from "../Environment";

// et_deserunt@Tagfeed.biz
// dritt

const mutation = graphql`
  mutation LoginMutation($input: LoginUserInput!) {
    loginUser(input: $input) {
      user {
        id
      }
    }
  }
`;

export default (email, password, callback) => {
  const variables = {
    input: {
      email,
      password
    }
  };

  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: (response, error) => {
      callback(error);
    },
    onError: err => {
      console.error(err);
    }
  });
};
