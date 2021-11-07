
import type { RouteType } from '../RouteWithSubRoutes';
import {Login} from "../../features/login/Login";
import {Register} from "../../features/register/register";

const routes: RouteType[] = [
  {
    path: '/login',
    component: Login,
    exact: true,
    excludeAuth: true,
  },

  {
    path: '/register',
    component: Register,
    exact: true,
    excludeAuth: true,
  },
];

export default routes;
