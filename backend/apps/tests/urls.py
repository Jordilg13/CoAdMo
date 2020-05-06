from django.conf.urls import include, url
from .views import Sql

urlpatterns = [
    # matches IPs and hostnames
    # E.G: 192.168.1.150 or mail.projectejordi.es
    url('sql', Sql.as_view({'get': 'list'})),
    

]
