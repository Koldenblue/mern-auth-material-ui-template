import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser, selectCurrentUser } from '../redux/userSlice';
import { Paper, Button, Typography } from '@material-ui/core';
import { selectClasses } from '../redux/classSlice';

// This page can be reached whether logged in or not, but will display different contents depending on login status.
export default function LoginStatus(props) {
  const [loginStatus, setLoginStatus] = useState();
  const dispatch = useDispatch();
  let currentUser = useSelector(selectCurrentUser);
  const classes = useSelector(selectClasses);

  const logout = () => {
    Axios.get('api/logout').then(() => {
      dispatch(setCurrentUser(null));
      // reloading the page with window.location.reload() also works to log the user out, since the initial null user value is retrieved from the store upon page load
    }).catch(err => { console.error(err) })
  }

  // upon login status change, conditionally render home page
  useEffect(() => {
    if (currentUser) {
      // console.log(userInfo);
      setLoginStatus(
        <Paper elevation={3} className='home'>
          <Typography variant='body1' className='paper-p' >
            You are logged in as user "{currentUser.username}".
          </Typography>
          <Button variant='contained' onClick={logout}>log out</Button>
        </Paper>
      )
    } else {
      setLoginStatus(
        <Paper className='home'>
          <Typography variant='body1' className='paper-p' >
            You are not logged in.
          </Typography>
          <Typography variant='body1' className='paper-p' >
            <a href='/login'>Go to login page</a>
          </Typography>
        </Paper>
      )
    }
  }, [currentUser])

  // this code gets rid of the flash of 'you are not logged in' while still loading the logged in user
  if (props.loading) {
    return (<></>)
  }
  else {
    return (
      <>
        <h5 className='text-center'>The below paragraph changes depending on whether a user is currently logged in.</h5>
        {loginStatus}
      </>
    )
  }
}