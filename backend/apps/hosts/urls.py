from django.conf.urls import include, url
from .views import Host

urlpatterns = [
    # matches IPs and hostnames
    # E.G: 192.168.1.150 or mail.projectejordi.es
    # url(r"users/(?P<parameter>(?:[-@\w]+))$", Users.as_view()),
    url(r'^(?P<hostname>((?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?))/(?P<parameter>(?:[-@\w]+))$', Host.as_view()),
]
