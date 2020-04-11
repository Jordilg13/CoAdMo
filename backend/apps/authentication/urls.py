from django.conf.urls import include, url
from .views import LoginAPIView, LoggedUser

urlpatterns = [
    url('login', LoginAPIView.as_view()),
    url('logged_user', LoggedUser.as_view()),
]
