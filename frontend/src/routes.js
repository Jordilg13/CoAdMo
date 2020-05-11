import React from 'react';

const Dashboard = React.lazy(() => import("./components/Dashboards/Main/Dashboard"));
const UsersDashboard = React.lazy(() => import("./components/Dashboards/Users/Dashboard"));
const HostDashboard = React.lazy(() => import("./components/Dashboards/Hosts"));
const Host = React.lazy(() => import("./components/Host/Host"));
const User = React.lazy(() => import("./components/User/User"));
const SqlConnectionsTable = React.lazy(() => import("./components/SqlMonitor"));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  // DASHBOARDS
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', name: 'Users', component: UsersDashboard },
  { path: '/hosts', name: 'Hosts', component: HostDashboard },
  // HOST
  { path: '/host/:hostname', name: 'Host', component: Host },
  // USERS
  { path: '/user/:username', name: 'Users', component: User },
  // CONNECTIONS
  { path: '/db', name: 'SqlConnections', component: SqlConnectionsTable }
];

export default routes;
