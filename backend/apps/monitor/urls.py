from django.conf.urls import include, url
from django.urls import path
from .views import  ActiveDirectoryMonitor, SqlConnections, DNSService, SQLServerService

urlpatterns = [
    # matches IPs and hostnames
    # E.G: 192.168.1.150 or mail.projectejordi.es
    # path("<str:service>/<str:hostname>", Monitor.as_view()),
    path("ad/", ActiveDirectoryMonitor.as_view()),
    path("sql/", SqlConnections.as_view({'get': 'list'})),
    path("dns/", DNSService.as_view()),
    path("sqlhc/", SQLServerService.as_view()),

]
