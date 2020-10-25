import React from "react";
import { connect } from "react-redux";

import {
  Button,
  Grid,
  Paper,
  AppBar,
  Typography,
  Toolbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import Snackbar from "@material-ui/core/Snackbar";

import CustTextInput from "./CustTextInput";
import "./Login.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const aol = (value) =>
  value && /.+@aol\.com/.test(value)
    ? "Really? You still use AOL for your email?"
    : undefined;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLoginCredValid: this.props.isLoginCredValid,
      isSnackBarOpen: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.isLoginCredValid !== this.props.isLoginCredValid) {
      this.setState({ isLoginCredValid: this.props.isLoginCredValid });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    await this.props.checkLogin({
      username: this.state.username,
      password: this.state.password,
    });
    if (this.state.isLoginCredValid) {
      this.props.history.push("/welcome");
    } else {
      this.setState({ isSnackBarOpen: true });
    }
  };

  ValidationForm = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <CustTextInput
              type="email"
              placeholder="Email"
              name="username"
              onChange={(event) =>
                this.setState({
                  [event.target.name]: event.target.value,
                })
              }
              autoFocus={true}
            />
          </Grid>
          <Grid item>
            <CustTextInput
              type="password"
              placeholder="Password"
              name="password"
              onChange={(event) =>
                this.setState({
                  [event.target.name]: event.target.value,
                })
              }
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="button-block"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  };
  render() {
    return (
      <div>
        <AppBar position="static" alignitems="center" color="primary">
          <Toolbar>
            <Grid container justify="center" wrap="wrap">
              <Grid item>
                <Typography variant="h6">Login</Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Grid container spacing={0} justify="center" direction="row">
          <Grid item>
            <Grid
              container
              direction="column"
              justify="center"
              spacing={2}
              className="login-form"
            >
              <Paper
                variant="elevation"
                elevation={2}
                className="login-background"
              >
                <Grid item>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                </Grid>
                <Grid item>
                  <form onSubmit={this.handleSubmit}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <CustTextInput
                          type="email"
                          placeholder="Email"
                          name="username"
                          onChange={(event) =>
                            this.setState({
                              [event.target.name]: event.target.value,
                            })
                          }
                          autoFocus={true}
                        />
                      </Grid>
                      <Grid item>
                        <CustTextInput
                          type="password"
                          placeholder="Password"
                          name="password"
                          onChange={(event) =>
                            this.setState({
                              [event.target.name]: event.target.value,
                            })
                          }
                        />
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          className="button-block"
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.state.isSnackBarOpen}
          autoHideDuration={6000}
        >
          <Alert severity="error">Invalid Credentials! Please Try Again!</Alert>
        </Snackbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoginCredValid: state.isLoginCredValid,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    checkLogin: (value) => dispatch({ type: "CHECK_LOGIN_CRED", value }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
