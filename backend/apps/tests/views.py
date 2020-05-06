from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from .models import InventarioHard, ConexionesSQL
from .serializers import SqlSerializer

class Sql(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    serializer_class = SqlSerializer
    queryset = ConexionesSQL.objects.all()

    # def get(self, request):

        # return Response('algo')
