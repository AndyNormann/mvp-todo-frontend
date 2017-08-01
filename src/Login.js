import React from "react";
import { Paper, TextField, Divider, FlatButton } from "material-ui";
import LoginMutation from "./Mutations/LoginMutation";
import { browserHistory } from "react-router";

const loginStyle = {
  display: "flex",
  justifyContent: "center"
};

const paperStyle = {
  margin: "40px",
  width: "1500px"
};

const textFieldStyle = {
  width: "100%",
  fontSize: "1.5em",
  padding: "15px"
};

const loginButtonStyle = {
  width: "100%",
  height: "50px",
  fontSize: "1.5em"
};

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      err: false
    };
  }

  login() {
    console.log(this.state);
    let { email, password } = this.state;
    LoginMutation(email, password, err => {
      if (err) {
        this.setState({ err: true });
        return;
      }
      browserHistory.push("/");
    });
  }

  passwordChange(val) {
    this.setState({ password: val });
  }
  emailChange(val) {
    this.setState({ email: val });
  }

  render() {
    return (
      <div style={loginStyle}>
        <Paper zDepth={2} style={paperStyle}>
          <TextField
            style={textFieldStyle}
            floatingLabelText="Username"
            underlineShow={false}
            onChange={(_, val) => {
              this.emailChange(val);
            }}
            errorText={this.state.err ? "Wrong email" : ""}
          />
          <Divider />
          <TextField
            style={textFieldStyle}
            floatingLabelText="Password"
            type="password"
            underlineShow={false}
            onChange={(_, val) => {
              this.passwordChange(val);
            }}
            errorText={this.state.err ? "Or Password" : ""}
          />
          <Divider />
          <FlatButton
            style={loginButtonStyle}
            primary
            label="Login"
            onTouchTap={() => {
              this.login();
            }}
          />
        </Paper>
      </div>
    );
  }
}

export default Login;
