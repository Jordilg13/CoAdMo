from django.shortcuts import render
from classes.ActiveDirectory import ActiveDirectory
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
import os
import pprint
import datetime
import time

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
        users = [i[1] for i in users]
        for i in users:
            for j in i:
                i[j] = i[j][0].decode("utf-8")

        # mark users with custom flags
        for i in users:
            # BLOCKED USERS
            try:
                if i['lockoutTime'] != "0":
                    i['isBlocked'] = True
            except:
                pass

            i['pwdLastSet'] = self.ad_timestamp(int(i['pwdLastSet']))

            # USERS WITH EXPIRED PASSWORDS
            exp_date = i['pwdLastSet'] + host.PASSWORD_EXPIRATION_DATE.total_seconds()
            today = datetime.datetime.today().timestamp()
            
            # try:
            if i['pwdLastSet'] != 0 and i['accountExpires'] != "0" and today > exp_date:
                i['isExpired'] = True
            # except:
            #     pass

        return Response(users)

    def ad_timestamp(self, timest):
        """
        Convert the format of the active directory returned dates to a Date
        """
        if timest != 0 and timest != 9223372036854775807: # if never expires
            return (datetime.datetime(1601, 1, 1) + datetime.timedelta(seconds=timest/10000000)).timestamp()
        return 0


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
