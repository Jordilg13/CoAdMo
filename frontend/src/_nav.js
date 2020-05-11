export default {
  items: [
    {
      name: 'Dashboards',
      url: '/dashboard',
      icon: 'icon-grid',
      children: [
        {
          name: 'Principal',
          url: '/dashboard',
          icon: 'icon-screen-desktop'
        },
        {
          name: 'Users',
          url: '/users',
          icon: 'icon-screen-desktop'
        },
        {
          name: 'Hosts',
          url: '/hosts',
          icon: 'icon-screen-desktop'
        },
      ]
    },
    {
      name: 'Conexiones',
      url: '/db',
      icon: 'icon-chart'
    },
  ],
};
