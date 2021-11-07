import * as React from 'react';


import type { RouteType } from './RouteWithSubRoutes';

export interface ProtectRouteProps {
  children?: React.ReactNode | JSX.Element;
  route: RouteType;
}

export const ProtectRoute = ({ children, route }: ProtectRouteProps) => {
  const isAuth = false;

  if (route.excludeAuth === undefined || route.excludeAuth) {
    return children;
  }

  return isAuth ? children : null;
};
