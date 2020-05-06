export default {
  items: [
    {
      name: 'Dashboards',
      url: '/dashboard',
      icon: 'icon-speedometer',
      children: [
        {
          name: 'Principal',
          url: '/',
          icon: 'icon-puzzle'
        },
        {
          name: 'Users',
          url: '/users',
          icon: 'icon-puzzle'
        },
      ]
    },
    {
      name: "Samples",
      icon: 'icon-speedometer',
      children: [
        {
          name: 'Host',
          url: '/host/192.168.1.150',
          icon: 'icon-puzzle'
        },
        ,
        {
          name: 'User',
          url: '/user/django',
          icon: 'icon-puzzle'
        },
      ]
    },
    {
      name: 'Conexiones',
      url: '/db',
      icon: 'icon-puzzle'
    },
  ],
};
