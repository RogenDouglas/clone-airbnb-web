import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { ModalContainer } from "react-router-modal";
import "react-router-modal/css/react-router-modal.css";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import { isAuthenticated } from "./services/auth";

type PrivateRouteProps = React.PropsWithChildren<any>;

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes: React.FC = () => (
  <BrowserRouter>
    <>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute path="/home" component={Home} />
        <Route path="*" component={() => <h1>Pagina não encontrada.</h1>} />
      </Switch>
      <ModalContainer />
    </>
  </BrowserRouter>
);

export default Routes;
