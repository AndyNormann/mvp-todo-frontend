import React from "react";
import { Paper, Card, CardText } from "material-ui";

class Test extends React.Component {
  render() {
    return (
      <Paper zDepth={2} style={{ margin: "100px" }}>
        <Card>
          <CardText>Halla</CardText>
        </Card>
        <Card>
          <CardText>Yoyo</CardText>
        </Card>
        <Card>
          <CardText>Malebann</CardText>
        </Card>
        <Card>
          <CardText>snippesnapp</CardText>
        </Card>
      </Paper>
    );
  }
}

export default Test;
