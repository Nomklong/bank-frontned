import React from 'react';
import './App.css';
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import theme from "./styles/theme";
import {Switch, BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import RouteWithSubRoutes from "./router/RouteWithSubRoutes";
import routes from "./router/routes";

function App() {
  return (
      <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
              <Router>
                  <Switch>
                      {routes.map(route => (
                          <RouteWithSubRoutes key={route.path} {...route} />
                      ))}
                      {/* eslint-disable-next-line react/jsx-no-undef */}
                      <Route path='*' exact={true} children={(<Redirect to="/login" />)} />
                  </Switch>
              </Router>
          </ThemeProvider>
      </StyledEngineProvider>
  );
}

export default App;
