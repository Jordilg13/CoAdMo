from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
# from .renderers import UserJSONRenderer
from .serializers import LoginSerializer

# Create your views here.


class LoginAPIView(APIView):
    permission_classes = (AllowAny,)
    # renderer_classes = (UserJSONRenderer,)
    serializer_class = LoginSerializer

    def post(self, request):
        user = request.data.get('user', {})

        # validation of the received data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        print(serializer.validated_data)

        return Response(serializer.validated_data, status=status.HTTP_200_OK)
