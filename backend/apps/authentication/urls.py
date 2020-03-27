from django.conf.urls import include, url
from .views import LoginAPIView

urlpatterns = [
    url('login/', LoginAPIView.as_view()),
]
