from rest_framework import serializers
from django.contrib.auth import authenticate
from datetime import datetime, timedelta
import jwt
from django.conf import settings


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255, write_only=True)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        username = data.get("username", None)
        password = data.get("password", None)

        if username is None:
            raise serializers.ValidationError(
                "Username is missing."
            )

        if username is None:
            raise serializers.ValidationError(
                "Password is missing."
            )

        user = authenticate(
            username=username,
            password=password,
        )
        if user is None:
            raise serializers.ValidationError(
                'Wrong credentials, please try again.'
            )

        return {
            "username": str(user),
            "token": self._generate_jwt_token(user)
        }

    def _generate_jwt_token(self, username):
        """
        Generates a JSON Web Token that stores this user's ID and has an expiry
        date set to 7 hours into the future.
        """
        token = jwt.encode(
            {
                'username': str(username),
                'exp': datetime.utcnow() + timedelta(hours=7)
            },
            settings.SECRET_KEY,
            algorithm='HS256'
        )
        return token.decode('utf-8')
