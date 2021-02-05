import React, { useState, useEffect } from "react";
import { Button, Container, Grid, TextField } from '@material-ui/core';
import AlertBox from './AlertBox';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import WatercolorBackground from "./WatercolorBackground";
import { setCurrentUser } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginJumbotron from './LoginJumbotron';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(<></>);
  const history = useHistory();
  const dispatch = useDispatch();

  let handleSubmit = (event) => {
    event.preventDefault();
    if (username === '' || password === '') {
      setMessage("Neither username nor password may be blank.");
    }
    else {
      let user = {
        username: username,
        password: password
      }
      // attempt to log in with username and password
      axios.post(`/api/login`, user).then((data) => {
        // if successful, get all related user data
        axios.get("/api/userdata").then(({data}) => {
          // set the user data in the redux store
          if (data) {
            dispatch(setCurrentUser(data))
          }
        }).then(() => {
          // finally, go to '/'. Can also use: history.push("/");
          setRedirect(<Redirect to='/'></Redirect>)
        }).catch((err) => {
          throw new Error(err)
        })
      }).catch((err) => {
        if (err.message === "Request failed with status code 401") {
          setMessage("Incorrect username or password.");
        } else {
          console.error(err);
        }
      })
    }
  }

  let goToSignup = (event) => {
    event.preventDefault();
    history.push('/signup')
  }

  // sets alert box message back to blank whenever username or password fields are edited
  useEffect(() => {
    if (message !== "") {
      setMessage("");
    }
    // dependency should not include message, otherwise it would always be set to blank
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, password])

  // button to log in with preset username and pass
  const devLogin = () => {
    axios.post(`/api/login`, { username: "1", password: "111111" }).then(data => {
      axios.get("/api/userdata").then(({data}) => {
        // set the user data in the redux store
        if (data) {
          dispatch(setCurrentUser(data))
        }
      }).then(() => {
        setRedirect(<Redirect to='/'></Redirect>)
      }).catch((err) => {
        throw new Error(err)
      })
    }).catch((err) => {
      if (err.message === "Request failed with status code 401") {
        setMessage("Incorrect username or password.");
      } else {
        console.error(err);
      }
    })
  };

  return (<>
    {redirect}
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
              />
          </Grid>
          <Grid></Grid>


          <Grid></Grid>
          <Grid>
              <TextField
                label='Password'
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                name='password'
              />
          </Grid>
          <Grid></Grid>

          <Grid></Grid>
          <Grid>
            <Button className='signupLoginBtns' onClick={handleSubmit} variant="contained" color='primary' type="submit">
              Log In
            </Button>
          </Grid>
          <Grid></Grid>

          <Grid></Grid>
          <Grid>
            <Button className='signupLoginBtns' onClick={goToSignup} variant="contained" color='secondary' type="submit">
              Sign Up Form
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

        {/* Button for easily logging in, after running seed.js. Comment this code out for production deployment. */}
        <Button onClick={devLogin}>
          Dev Login for protected route
        </Button>
        <br />

        {/* Link to a page that can be accessed whether logged in or not, but changes depending on login status. */}
        <a href='/loginstatus'>Go to page dependent on login status</a>
      </form>
    </Container>
  </>)
}

export default Login;