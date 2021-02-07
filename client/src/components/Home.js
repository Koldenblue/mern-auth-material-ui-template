import React from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../redux/userSlice';
import Typography from '@material-ui/core/Typography'

export default function Home() {
  const dispatch = useDispatch();

  const logout = () => {
    Axios.get('api/logout').then(() => {
      // reloading the page with "window.location.reload()" also works, since the initial user state is retrieved from the store upon page load
      dispatch(setCurrentUser(null));
      // window.location.reload();
    })
  }

  return(
    <>
      <Typography variant='h3' align='center' gutterBottom>
        This page is protected by ProtectedRoute.js, and is only reachable when logged in.
      </Typography>
      <button onClick={logout}>log out</button>
    </>
  )
}