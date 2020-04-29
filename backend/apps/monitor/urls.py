from django.conf.urls import include, url
from django.urls import path
from .views import  ActiveDirectoryMonitor

urlpatterns = [
    # matches IPs and hostnames
    # E.G: 192.168.1.150 or mail.projectejordi.es
    # path("<str:service>/<str:hostname>", Monitor.as_view()),
    path("ad/<str:hostname>", ActiveDirectoryMonitor.as_view()),

]
