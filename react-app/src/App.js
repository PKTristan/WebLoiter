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
        <ServersNavBar />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/servers/:id">
            <CurrentServerDetails />
          </Route>
        </Switch>
        </>
      )}
    </>
  );
}

export default App;
