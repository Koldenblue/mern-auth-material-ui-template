import React, { useState, useEffect } from "react";
import { Button, Container, Grid, TextField } from '@material-ui/core';
import AlertBox from './AlertBox';
import axios from 'axios';
import { Redirect } from "react-router-dom"
import { useHistory } from "react-router-dom";
import WatercolorBackground from "./WatercolorBackground";
import LoginJumbotron from './LoginJumbotron';

function Signup({ loading, user }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  let handleSubmit = (event) => {
    event.preventDefault();

    if (username === '' || password === '') {
      setMessage("Neither username nor password may be blank.")
    }
    else {
      let user = {
        username: username,
        password: password
      }

      axios.post('api/users', user).then(data => {
        if (data.data === "That username already exists!") {
          setMessage(data.data);
        }
        else if (data.data === "Password must be at least 6 characters.") {
          setMessage(data.data);
        }
        else {
          // window.location.href = '/login';
          history.push('/login');
        }
      }).catch(err => {
        console.error(err);
        setMessage("Signup unsuccessful, unknown error.")
      })
    }
  }

  let goToLogin = (event) => {
    event.preventDefault();
    // window.location.replace("/login")
    history.push('/login');
  }

  // sets alert box message back to blank whenever username or password fields are edited
  useEffect(() => {
    if (message !== "") {
      setMessage("");
    }
    // dependency should not include message, otherwise it would always be set to blank
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, password])

  return ((user && !loading) ? <Redirect to="/home" /> :
    <>
      <LoginJumbotron />
      <WatercolorBackground />
      <Container className='loginSignupContainer'>

        <form>
            <Grid></Grid>
            <Grid>
                <TextField
                  label="Username"
                  name='username'
                  onChange={(event) => setUsername(event.target.value)}
                  type="text"
                  placeholder=""
                />
            </Grid>
            <Grid></Grid>


            <Grid></Grid>
            <Grid>
                <TextField
                  label='Password'
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  placeholder="password"
                  name='password'
                />
            </Grid>
            <Grid></Grid>

            <Grid></Grid>
            <Grid>
              <Button className='signupLoginBtns' onClick={handleSubmit} variant="contained" color='secondary' type="submit">
                Sign up
              </Button>
            </Grid>
            <Grid></Grid>

            <Grid></Grid>
            <Grid>
              <Button className='signupLoginBtns' onClick={goToLogin} variant="contained" color='primary' type="submit">
                Go to Log In Form
              </Button>
            </Grid>
            <Grid></Grid>

            <Grid></Grid>
            <Grid>
              <AlertBox
                message={message}
              />
            </Grid>
            <Grid></Grid>

        </form>
      </Container>
    </>
  )
}

export default Signup;