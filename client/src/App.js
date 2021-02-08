import React, { useState, useEffect } from 'react';
import { setCurrentUser, selectCurrentUser } from './redux/userSlice';
import { selectClasses, selectLoadingClasses, setClasses } from './redux/classSlice';
import { useSelector, useDispatch } from 'react-redux';
import Login from './components/LoginSignupPages/Login';
import Signup from './components/LoginSignupPages/Signup';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios';
import Home from './components/Home';
import FourOhFour from './components/FourOhFour';
import ProtectedRoute from './components/ProtectedRoute';
import LoginStatus from './components/LoginStatus';
import { withStyles } from '@material-ui/core/styles';

// styles are passed as props to App
const styles = {
  form: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-evenly'
  }
}


export default withStyles(styles)(function App(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)
  let currentUser = useSelector(selectCurrentUser);
  const { classes } = props;
  const loadingClasses = useSelector(selectLoadingClasses);

  // upon route switch, gets user info if already logged in (otherwise redux store state is reset to initial value on page reload)
  useEffect(() => {
    // get user login info, then set redux state. loading is true until login info is retrieved
    axios.get("/api/userdata").then(({ data }) => {
      if (data) {
        dispatch(setCurrentUser(data));
      }
      setLoading(false);
    }).catch(err => {
      console.error(err);
    })
    // according to redux docs, dispatch function identity is stable and therefore doesn't need to be included in dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // the App will not render until the dispatch is successful
  useEffect(() => {
    console.log(classes);
    console.log(loadingClasses)
    dispatch(setClasses(classes));
  }, [classes])


  return loadingClasses ? (<></>) : (
    <div className="App">
      <Router>
        <Switch>

          {/* Home component only reachable if user is logged in. */}
          <ProtectedRoute exact path="/" user={currentUser} isLoading={loading} onFailureRedirectToPath="/login">
            <Home />
          </ProtectedRoute>

          <Route exact path='/login'>
            <Login />
          </Route>

          <Route exact path='/signup'>
            <Signup />
          </Route>

          <Route exact path='/loginstatus'>
            <LoginStatus loading={loading}/>
          </Route>

          {/* Any path not listed above returns 404 */}
          <Route path='/'>
            <FourOhFour />
          </Route>

        </Switch>
      </Router>
    </div>
  );
})