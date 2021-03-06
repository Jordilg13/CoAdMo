import datetime
import os
import pprint
import time

import ldap
from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

import apps.users.ADutils as utils
from apps.core.models import Logs
from apps.core.serializers import LogsSerializer
from classes.ActiveDirectory import ActiveDirectory

from .models import Users
from .serializers import UserSerializer

# Create your views here.


class AllUsers(APIView):
    permission_classes = (IsAuthenticated,)
    # parameters allowed to filter the search

    def get(self, request):
        # new basehost with his monitor operations
        host = ActiveDirectory()

        # all that matches with the filter
        query_filter = "(&(objectClass=user)(!(objectClass=computer))(!(samaccountname=SM_*)))"

        # return the attributes that matches with the given arguments
        attrs = ["accountExpires", "cn", "displayName", "distinguishedName",
                 "givenName", "pwdLastSet", "sAMAccountName", "userAccountControl",
                 "userPrincipalName", "whenChanged", "whenCreated", "lockoutTime",
                 "employeeNumber", "sn"]

        # execute the query
        users = host.search(query_filter, attrs, "CN=Users,")

        # change to a proper format
        users = utils.format_data(users)

        # mark users with custom flags
        users = utils.set_flags(
            users,  host.PASSWORD_EXPIRATION_DATE.total_seconds())


        # close the connection when the operation is done
        host.conn.unbind_s()
        return Response(users)


class User(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, username):
        result_data = {
            "ad": {},
            "db": {},
            "errors": False,
            "errors_in": []
        }
        # try to get user info from the db, if it fails,
        # add db to the errors to display them in frontend
        try:
            serializer = UserSerializer(Users.objects.get(usuario=username))
        except Users.DoesNotExist as err:
            serializer = UserSerializer()
            result_data['errors'] = True
            result_data['errors_in'].append("base de datos")

        host = ActiveDirectory()

        # all that matches with the filter
        query_filter = "(&(objectClass=user)(sAMAccountName={}))".format(
            username)
        # return the attributes that matches with the given arguments
        attrs = ["accountExpires", "cn", "displayName", "distinguishedName",
                 "givenName", "pwdLastSet", "sAMAccountName", "userAccountControl",
                 "userPrincipalName", "whenChanged", "whenCreated", "lockoutTime",
                 "employeeNumber", "sn"]

        # execute the query
        ad_user_info = host.search(query_filter, attrs)

        # change to a proper format
        ad_user_info = utils.format_data(ad_user_info)

        # mark ad_user_info with custom flags
        ad_user_info = utils.set_flags(
            ad_user_info,  host.PASSWORD_EXPIRATION_DATE.total_seconds())

        if len(ad_user_info) == 0:
            result_data['errors'] = True
            result_data['errors_in'].append("active directory")
        else:
            result_data["ad"] = ad_user_info[0]

        # Process data
        result_data['db'].update({key: value.strip() if isinstance(
            value, str) else value for key, value in serializer.data.items()})

        host.conn.unbind_s()
        return Response(result_data)


class UnlockUser(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, cn):
        host = ActiveDirectory()
        result = host.modify(cn, {"lockoutTime": "0"})
        host.conn.unbind_s()
        savelog = Logs(service="activedirectory", description="unlocked user: "+cn,
                       justification="")
        savelog.save()  # save log in the db

        return Response(result)


class CreateUser(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, username):
        host = ActiveDirectory()
        data = request.data['data']
        reponse = host.create_user(username, data['userinfo'])
        host.conn.unbind_s()

        savelog = Logs(
            service="activedirectory",
            description=data['just']['desc'],
            justification=data['just']['just'])
        savelog.save()  # save log in the db

        return Response(reponse)


class DeleteUser(APIView):
    permission_classes = (IsAuthenticated,)

    def delete(self, request, cn):
        host = ActiveDirectory()

        deleted = host.deleteUser(cn)
        savelog = Logs(service="activedirectory", description="deleted user: "+cn,
                       justification="")
        savelog.save()  # save log in the db

        return Response(deleted)


class UpdateUser(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request, dn):
        host = ActiveDirectory()
        result = host.modify(dn, request.data['data'])
        host.conn.unbind_s()

        savelog = Logs(service="activedirectory", description="updated user: "+dn,
                       justification="")
        savelog.save()  # save log in the db

        return Response(result)

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
#                 response = host.search(query_filter, attrs)
#             elif parameter == "expired":
#                 expiration_date = 3888000  # the expiration time is 45 days

#                 query_filter = "(&(objectClass=user)(pwdlastset<={}))".format(
#                     expiration_date)
#                 attrs = ["accountExpires", "cn", "displayName", "distinguishedName", "givenName", "pwdLastSet",
#                          "sAMAccountName", "userAccountControl", "userPrincipalName", "whenChanged", "whenCreated"]
#                 response = host.search(query_filter, attrs)
#                 response = [i[1]
#                             for i in response if i[1]['pwdLastSet'][0] is "0"]

#             # filters if the account doesn't have expiration time

#         return Response(response) 1.531,249166666667‬
