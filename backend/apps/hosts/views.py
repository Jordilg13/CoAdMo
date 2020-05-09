from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from classes.BaseHost import BaseHost
import os
import wmi


class Host(APIView):
    permission_classes = (IsAuthenticated,)
    allowed_parameters = [
        "space_available", "ram_usage", "cpu_usage", "restart", "shutdown", "hardware_inventory", "software_inventory"]

    def get(self, request, hostname, parameter):
        # checks if the parameter is allowed
        if parameter not in self.allowed_parameters:
            return Response("Invalid parameter '%s'" % parameter)

        try:
            # new basehost with his monitor operations
            host = BaseHost(request, hostname)
        except wmi.x_wmi as x:
            print(x)
            return Response({
                "error": True,
                "msg": x.com_error.excepinfo[2]
            })

        # if host is down, dont check nothing
        if host.status == -1:
            return Response("Can't reach %s" % hostname)

        # execute the function with the same name of the received parameter
        # E.g. if cpu_usage is received, this returns the function named 'cpu_usage' of the 'host' instance
        # then the response will be { "cpu_usage": host.cpu_usage() }
        # resolving it, { "cpu_usage": "0" }

        # TODO: change this because it makes no sense send the parameter name
        # cause when u do the request, u know what are expecting ffor
        response = {
            parameter: getattr(host, parameter)()
        }


        return Response(response)
