import os
import sys

import random
import ldap
import wmi
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from classes.ActiveDirectory import ActiveDirectory
from classes.BaseHost import BaseHost

from .serializers import SqlSerializer
from .models import ConexionesSQL
import socket
import pyodbc


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
            err = getattr(sys.exc_info()[1], "args")[0]['desc']
            response['errors'].append(err)

        return Response(response)


class SqlConnections(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    serializer_class = SqlSerializer
    queryset = ConexionesSQL.objects.all()

# NOT IMPLEMENTED


# class DNSService(APIView):
#     def get(self, request):
#         try:
#             response = socket.gethostbyname('projectejordi.es')
#         except:
#             response = False
#         return Response(response)


class SQLServerService(APIView):
    def get(self, request):
        servers = ["192.168.1.150"]
        results = []
        for i in servers:
            try:
                conn = pyodbc.connect(
                    "Driver={ODBC Driver 17 for SQL Server};Server=%s;Database=Sistemas;UID=%s;PWD=%s" % (
                        i,
                        os.getenv("DB_USER"),
                        os.getenv("DB_PASSWORD")
                    )
                )
                results.append([i, True])
            except:
                results.append([i, False])

        return Response(results)
        
