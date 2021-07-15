
import { useEffect } from 'react';
import './App.css';
import ErrorModal from './components/ErrorModal/ErrorModal'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';

import { login } from './store/auth-actions';
import { Switch, Route, Redirect } from 'react-router-dom';
import { UISliceActions } from './store/ui-slice';
import { authSliceActions } from './store/auth-slice';

function App() {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('token');

      if (token === null) {
        return;
      }

      if (token) {
        const response = await axios.get('/api/auth/user', {
          headers: {
            "x-auth-token": token // TOKEN from state
          }
        })

        const data = response.data;

        if (response.statusText !== 'OK') {
          dispatch(UISliceActions.toggleServerError({ error: data }));
          dispatch(UISliceActions.authFailed());
          return;
        } else {

          dispatch(authSliceActions.authSuccess({ user: data }))
        }
      }
    }
    checkLoggedIn();
  }, [dispatch])

  return (
    <div className="App">

      <Route path="/login">
        {!isAuthenticated && <Login />}
        {isAuthenticated && <Homepage />}
      </Route>
      <Route path="/register">
        {!isAuthenticated && <Register />}
        {isAuthenticated && <Homepage />}
      </Route>
      <Route path="/" exact>
        {!isAuthenticated && <Login />}
        {isAuthenticated && <Homepage />}
      </Route>
    </div>
  );
}

export default App;
