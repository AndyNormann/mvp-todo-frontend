import { Environment, Network, RecordSource, Store } from "relay-runtime";

const RELAY_API_ENDPOINT = "http://localhost:8080/graphql";

const store = new Store(new RecordSource());

const network = Network.create((operation, variables) => {
  return fetch(RELAY_API_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  }).then(response => {
    return response.json();
  });
});

const environment = new Environment({
  network,
  store
});

export default environment;
