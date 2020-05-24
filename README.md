# COADMO (README in process...)

COADMO is a web aplication, that monitors services and hosts, and it give you a elegant, flexible and responsive user interface to visualize all that data.

<img src="README_assets/img/responsive-showcase-mockup.png"/>

## Dashboards

### Main
This is the principal dashboard, where the resume of the state of the systems are displayed. It contains a small cards with the status of the systems, servers,or whatever you want to monitorize. It migth contain custom components. Also has a chart that shows the different aplications that are connected to each  database, and how many connections has each app. Finally(for the time being), a datatable with the users that have any kind a problem, it only shows the ones that are blocked or expired.


### Users
Here is where all the information about your LDAP users are displayed. It shows the quantity of blocked and expired users(with expired users I mean the users with the password expired). Behind this, a datatable with all the available users. It gives a powerful search feature, lets you add a new user, modify an existent one, unlock them, or finally, delete them. All users are tagged with his state in case they have one.