import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import ServersNavBar from "./components/ServersNavBar";
import CurrentServerDetails from "./components/CurrentServerDetails";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/Homepage";
import Channels from "./components/Channels";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path='/servers'>
              <ServersNavBar />

              <Route path="/servers/:id">
                <CurrentServerDetails />
                <Route exact path='/servers/:id/channels'>
                  <Channels />
                </Route>
                <Route exact path='/servers/:id/channels/:channelId'>
                  <Channels />
                </Route>
              </Route>

            </Route>
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
