from django.conf.urls import include, url
from django.urls import path
from .views import AllUsers, Users

urlpatterns = [
    # matches IPs and hostnames
    # E.G: 192.168.1.150 or mail.projectejordi.es
    path("users", AllUsers.as_view()),
    # url(r"^(?P<parameter>(?:[-@\w]+))$", Users.as_view()),
    path("users/<str:parameter>", Users.as_view()),
]
