import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import SignupFormPage from "./components/SignupFormPage";
// import LoginFormPage from "./components/LoginFormPage";
import ServersNavBar from "./components/ServersNavBar";
import CurrentServerDetails from "./components/CurrentServerDetails";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/Homepage";
import Messages from "./components/Messages"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="app-container">
    <Navigation isLoaded={isLoaded} />
    {isLoaded && (
      <div className="content-container">
        <Route path="/servers">
          <ServersNavBar />
        </Route>
        <div className="main-content">
          <Switch>
            <Route path="/servers/:id">
              <CurrentServerDetails />
            </Route>
            <Route exact path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </div>
    )}
  </div>
  );
}

export default App;
