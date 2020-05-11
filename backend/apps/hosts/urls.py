from django.conf.urls import include, url
from django.urls import path

from .views import Host, Hosts


urlpatterns = [
    # hostname: E.G: 192.168.1.150 or mail.projectejordi.es
    # parameter: E.G. cpu_usage, software_inventory
    url(r'^(?P<hostname>((?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?))/(?P<parameter>(?:[-@\w]+))$', Host.as_view()),
    path("all/", Hosts.as_view()),
]
