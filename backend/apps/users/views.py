from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from classes.ActiveDirectory import ActiveDirectory
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import render
from rest_framework import generics
import apps.users.ADutils as utils
from .serializers import UserSerializer
from .models import Users
import datetime
import pprint
import time
import os

# Create your views here.


class AllUsers(APIView):
    permission_classes = (IsAuthenticated,)
    # parameters allowed to filter the search

    def get(self, request):
        # new basehost with his monitor operations
        host = ActiveDirectory()

        # all that matches with the filter
        query_filter = "(&(objectClass=user))"
        attrs = ["accountExpires", "cn", "displayName", "distinguishedName", "givenName", "pwdLastSet", "sAMAccountName", "userAccountControl",
                 "userPrincipalName", "whenChanged", "whenCreated", "lockoutTime"]  # return the attributes that matches with the given arguments

        # execute the query
        users = host.execute_query(query_filter, attrs)

        # change to a proper format
        users = utils.format_data(users)

        # mark users with custom flags
        users = utils.set_flags(
            users,  host.PASSWORD_EXPIRATION_DATE.total_seconds())

        return Response(users)


class User(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, username):
        serializer = UserSerializer(Users.objects.get(usuario=username))
        host = ActiveDirectory()

        # all that matches with the filter
        query_filter = "(&(objectClass=user)(sAMAccountName={}))".format(
            username)
        attrs = ["accountExpires", "cn", "displayName", "distinguishedName", "givenName", "pwdLastSet", "sAMAccountName", "userAccountControl",
                 "userPrincipalName", "whenChanged", "whenCreated", "lockoutTime"]  # return the attributes that matches with the given arguments

        # execute the query
        ad_user_info = host.execute_query(query_filter, attrs)

        # change to a proper format
        ad_user_info = utils.format_data(ad_user_info)

        # mark ad_user_info with custom flags
        ad_user_info = utils.set_flags(
            ad_user_info,  host.PASSWORD_EXPIRATION_DATE.total_seconds())

        mixed_user_info = {
            "ad": ad_user_info,
            # strip every field to remove extra spaces
            "db": {key:value.strip() if isinstance(value,str) else value for key,value in serializer.data.items() }
        }
        
        return Response(mixed_user_info)



# class Users(APIView):
#     permission_classes = (IsAuthenticated,)
#     # parameters allowed to filter the search
#     allowed_parameters = ["locked", "expired"]

#     def get(self, request, parameter):
#         # new basehost with his monitor operations
#         host = ActiveDirectory()
#         response = "Invalid parameter '{0}'".format(parameter)

#         # if host is down, dont check nothing
#         if host.status == -1:
#             return Response("Users: Can't reach {0}".format(os.getenv("LDAP_IP")))

#         # heck if the parameter is valid
#         if parameter in self.allowed_parameters:
#             if parameter == "locked":
#                 query_filter = "(&(objectClass=user)(lockoutTime>=1))"
#                 attrs = ["cn"]
#                 response = host.execute_query(query_filter, attrs)
#             elif parameter == "expired":
#                 expiration_date = 3888000  # the expiration time is 45 days

#                 query_filter = "(&(objectClass=user)(pwdlastset<={}))".format(
#                     expiration_date)
#                 attrs = ["accountExpires", "cn", "displayName", "distinguishedName", "givenName", "pwdLastSet",
#                          "sAMAccountName", "userAccountControl", "userPrincipalName", "whenChanged", "whenCreated"]
#                 response = host.execute_query(query_filter, attrs)
#                 response = [i[1]
#                             for i in response if i[1]['pwdLastSet'][0] is "0"]

#             # filters if the account doesn't have expiration time

#         return Response(response) 1.531,249166666667‬
