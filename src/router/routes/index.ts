
import type { RouteType } from '../RouteWithSubRoutes';
import {Login} from "../../features/login/Login";
import {Register} from "../../features/register/register";
import {Profile} from "../../features/profile/profile";

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
  {
    path: '/profile',
    component: Profile,
  },
];

export default routes;
