import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ProtectRoute } from './ProtectRoute';
import {useAppSelector} from "../app/hooks";
import {getToken} from "../app/store/user/userSlice";

export type RouteType = {
  path: string;
  component: React.FC | React.ReactNode;
  exact?: boolean;
  excludeAuth?: boolean;
  routes?: Array<{
    path: string;
    component: React.FC | React.ReactNode;
    excludeAuth?: boolean;
  }>;
};

const checkRequireAuth = (
  route: RouteType,
  token?: string | null
): boolean => {
    return !route.excludeAuth && !token;
};

const RouteWithSubRoutes = (route: RouteType): JSX.Element => {
    const token = useAppSelector(getToken);
    const excludeAuth = checkRequireAuth(
        route,
        token
    );

  return (
    <Route
      path={route.path}
      render={() => {
        return excludeAuth ? (
          <Redirect to="/login" />
        ) : (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <ProtectRoute route={route}>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <route.component />
          </ProtectRoute>
        );
      }}
    />
  );
};

export default RouteWithSubRoutes;
