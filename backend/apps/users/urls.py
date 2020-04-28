from django.conf.urls import include, url
from django.urls import path
from .views import AllUsers, User, UnlockUser, CreateUser, DeleteUser, UpdateUser

urlpatterns = [
    # matches IPs and hostnames
    # E.G: 192.168.1.150 or mail.projectejordi.es
    path("users", AllUsers.as_view()),
    path("user/<str:username>", User.as_view()),
    path("user/unlock/<str:cn>", UnlockUser.as_view()),
    path("user/create/<str:username>", CreateUser.as_view()),
    path("user/delete/<str:cn>", DeleteUser.as_view()),
    path("user/update/<str:dn>", UpdateUser.as_view()),
]
