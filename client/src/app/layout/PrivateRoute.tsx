import { ComponentType } from "react";
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom";
import { useAppSelector } from "../store/configureStore";

interface PrivateRouteProps extends RouteProps {
  component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
}

export default function PrivateRoute({
  component: Component,
  ...rest
}: PrivateRouteProps) {
  const { user } = useAppSelector((state) => state.account);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
