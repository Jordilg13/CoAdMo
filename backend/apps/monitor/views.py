from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from classes.BaseHost import BaseHost
from classes.ActiveDirectory import ActiveDirectory
import os


class Status(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, hostname, parameter):
        # new basehost with his monitor operations
        host = BaseHost(hostname)
        response = "Wrong parameter '%s'" % parameter

        # if host is down, dont check nothing
        if host.status == -1:
            return Response("Can't reach %s" % hostname)

        # SWITCH-CASE behavior
        if parameter == "storage":
            response = host.space_available
        elif parameter == "ram":
            response = host.ram_usage
        elif parameter == "cpu":
            response = host.cpu_usage
        elif parameter == "restart":
            response = host.restart()
        elif parameter == "shutdown":
            response = host.shutdown()

        response = {
            parameter: response
        }

        return Response(response)


class Users(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, parameter):
        # new basehost with his monitor operations
        host = ActiveDirectory(os.getenv("LDAP_IP"))
        response = "Wrong parameter '{0}'".format(parameter)

        # if host is down, dont check nothing
        if host.status == -1:
            return Response("Users: Can't reach {0}".format(os.getenv("LDAP_IP")))

        # SWITCH-CASE behavior
        if parameter == "locked" or parameter == "expired" or parameter == "disabled":
            response = host.get_users_by_filter(parameter)

        # final object that will be sent to the client
        response = {
            parameter: response
        }

        return Response(response)
