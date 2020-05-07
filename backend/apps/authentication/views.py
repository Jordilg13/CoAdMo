from django.shortcuts import render
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import LoginSerializer


class LoginAPIView(APIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request):
        user = request.data.get('user', {})

        # validation of the received data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class LoggedUser(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        print(request.user.username)
        return Response(request.user.username)
