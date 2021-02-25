import React, { useState, useEffect } from "react";
import { Button, Container, Grid, TextField } from '@material-ui/core';
import AlertBox from './AlertBox';
import axios from 'axios';
import { Redirect } from "react-router-dom"
import { useHistory } from "react-router-dom";
import WatercolorBackground from "./WatercolorBackground";
import LoginJumbotron from './LoginJumbotron';
import { selectClasses } from '../../redux/classSlice';
import { useDispatch, useSelector } from 'react-redux';

function Signup({ loading, user }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();
  const classes = useSelector(selectClasses);

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

      <form onSubmit={handleSubmit}>
        <div className={classes.formRow}>
          <TextField
            label="Username"
            name='username'
            onChange={(event) => setUsername(event.target.value)}
            type="text"
            placeholder=""
          />
        </div>

        <div className={classes.formRow}>
          <TextField
            label='Password'
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="password"
            name='password'
          />
        </div>

        <div className={classes.formRow}>
          <Button className='login-signup-btn' onClick={handleSubmit} variant="contained" color='secondary' type="submit">
            Sign up
          </Button>
        </div>

        <div className={classes.formRow}>
          <Button className='login-signup-btn' onClick={goToLogin} variant="contained" color='primary'>
            Go to Log In Form
          </Button>
        </div>

        <div className={classes.formRow}>
          <AlertBox
            message={message}
          />
        </div>
      </form>
    </>
  )
}

export default Signup;