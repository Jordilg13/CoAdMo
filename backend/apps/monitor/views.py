from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from classes.BaseHost import BaseHost
from classes.ActiveDirectory import ActiveDirectory
import os


class Host(APIView):
    permission_classes = (IsAuthenticated,)
    allowed_parameters = [
        "space_available", "ram_usage", "cpu_usage", "restart", "shutdown"]

    def get(self, request, hostname, parameter):
        # new basehost with his monitor operations
        host = BaseHost(hostname)
        response = "Wrong parameter '%s'" % parameter

        # if host is down, dont check nothing
        if host.status == -1:
            return Response("Can't reach %s" % hostname)

        # checks if the parameter is allowed
        if parameter in self.allowed_parameters:
            # execute the 
            response = getattr(host, parameter)() 

        response = {
            parameter: response
        }

        return Response(response)


class Users(APIView):
    permission_classes = (IsAuthenticated,)
    # parameters allowed to filter the search
    allowed_parameters = ["lockedout", "accountexpired"]

    def get(self, request, parameter):
        # new basehost with his monitor operations
        host = ActiveDirectory(os.getenv("LDAP_IP"))
        response = "Wrong parameter '{0}'".format(parameter)

        # if host is down, dont check nothing
        if host.status == -1:
            return Response("Users: Can't reach {0}".format(os.getenv("LDAP_IP")))

        # heck if the parameter is valid
        if parameter in self.allowed_parameters:
            response = host.get_users_by_filter(parameter)

        # final object that will be sent to the client
        response = {
            parameter: response
        }

        return Response(response)
