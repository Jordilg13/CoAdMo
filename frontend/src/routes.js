import React from 'react';

const Dashboard = React.lazy(() => import("./components/Dashboards/Main/Dashboard"));
const UsersDashboard = React.lazy(() => import("./components/Dashboards/Users/Dashboard"));
const Host = React.lazy(() => import("./components/Host/Host"));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', name: 'Users', component: UsersDashboard },
  { path: '/host/:hostname', name: 'Users', component: Host },
];

export default routes;
