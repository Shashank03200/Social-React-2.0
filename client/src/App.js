import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FeedPage from "./pages/FeedPage";

function App() {
  const token = useSelector((state) => state.user.token);

  return (
    <div className="App">
      <Switch>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/" exact>
          {token ? <FeedPage /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
