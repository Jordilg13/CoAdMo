import os

import wmi
from django.shortcuts import render
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from classes.BaseHost import BaseHost
from classes.ActiveDirectory import ActiveDirectory
import ldap
import sys


class ActiveDirectoryMonitor(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        response = {
            "is_up": False,
            "errors": [],
        }

        try:
            # this try to connect to the ldap service in the remote host
            server = ActiveDirectory()
            response['is_up'] = True
        except:
            # if it fails, the service is down, unreachable or the credentials are invalid
            err = getattr(sys.exc_info()[1],"args")[0]['desc']
            response['errors'].append(err)

        return Response(response)
