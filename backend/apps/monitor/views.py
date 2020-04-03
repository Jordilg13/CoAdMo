from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from classes.BaseHost import BaseHost
from classes.ActiveDirectory import ActiveDirectory
import os


class Host(APIView):
    permission_classes = (AllowAny,)
    allowed_parameters = [
        "space_available", "ram_usage", "cpu_usage", "restart", "shutdown", "hardware_inventory", "software_inventory"]

    def get(self, request, hostname, parameter):
        # checks if the parameter is allowed
        if parameter not in self.allowed_parameters:
            return Response("Wrong parameter '%s'" % parameter)

        # new basehost with his monitor operations
        host = BaseHost(request, hostname)
        # if host is down, dont check nothing
        if host.status == -1:
            return Response("Can't reach %s" % hostname)

        # execute the function with the same name of the received parameter
        # E.g. if cpu_usage is received, this returns the function named 'cpu_usage' of the 'host' instance
        # then the response will be { "cpu_usage": host.cpu_usage() }
        # resolving it, { "cpu_usage": "0" }
        response = {
            parameter: getattr(host, parameter)()
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
