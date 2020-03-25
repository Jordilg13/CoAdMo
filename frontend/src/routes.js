import React from 'react';

const Dashboard2 = React.lazy(() => import("./components/Dashboard/Dashboard"));
const Linux = React.lazy(() => import("./components/linux"));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard2 },
  { path: '/linux', name: 'Linux', component: Linux },
];

export default routes;