# COADMO (README in process...)

COADMO is a web aplication, that monitors services and hosts, and it give you a elegant, flexible and responsive user interface to visualize all that data.

![Responsive layout](README_assets/img/responsive-showcase-mockup.png "Responsive layout")

## Technologies used

### Backend
* Django
* Django Rest Framework

#### Features
| Name | Description |
| - | - |
| django_auth_ldap | This is a Django authentication backend that authenticates against an LDAP service |
| python-dotenv | Reads the key-value pair from .env file and adds them to environment variable |
| wmi | lightweight wrapper on top of the pywin32 extensions. Hides some of the messy plumbing needed to get Python to talk to the WMI API |
| ldap | object-oriented API to access LDAP directory servers from Python programs |



### Frontend
* ReactJS
* Redux

### Database
* SQLServer

## App Features
* Logged actions

## Dashboards

### Main
This is the principal dashboard, where the resume of the state of the systems are displayed. It contains a small cards with the status of the systems, servers, or whatever you want to monitorize. It migth contain custom components. Also has a chart that shows the different aplications that are connected to each  database, and how many connections has each app. Finally(for the time being), a datatable with the users that have any kind of a problem, it only shows the ones that are blocked or expired.
![Dashboard image](README_assets/img/dashboard.png "Dashboard")

### Users
Here is where all the information about your LDAP users are displayed. It shows the quantity of blocked and expired users(with expired users I mean the users with the password expired). Behind this, a datatable with all the available users. It gives a powerful search feature, lets you add a new user, modify an existent one, unlock them, or finally, delete them. All users are tagged with his state in case they have one.
![Users Dashboard Image](README_assets/img/u_dashboard.png "Users Dashboard")

### Hosts
There is a simple list with the active hosts in the LDAP domain. Each hostname allows you to access to the profile of the host, this will be explained later.

![Hosts Dashboard Image](README_assets/img/h_dashboard.png "Hosts Dashboard")

### Connections


## Pages

### Profile user
### Profile host

## Modules

## Responsive