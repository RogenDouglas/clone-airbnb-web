import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
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
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <PrivateRoute path="/app" component={() => <h1>App</h1>} />
      <Route path="*" component={() => <h1>Pagina não encontrada.</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
