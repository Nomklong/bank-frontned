import * as React from 'react';


import type { RouteType } from './RouteWithSubRoutes';
import {useAppSelector} from "../app/hooks";
import {getToken} from "../app/store/user/userSlice";
import {useAppDispatch} from "../app/hooks";
import {asyncCheckBalance} from "../app/store/user/walletSlice";

export interface ProtectRouteProps {
  children?: React.ReactNode | JSX.Element;
  route: RouteType;
}

export const ProtectRoute = ({ children, route }: ProtectRouteProps) => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(asyncCheckBalance());
  }, [dispatch]);

  const isAuth = useAppSelector(getToken);

  if (route.excludeAuth === undefined || route.excludeAuth) {
    return children;
  }

  return isAuth ? children : null;
};
