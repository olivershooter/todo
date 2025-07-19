from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

# Will turn Python into JSON to handle the communication with the DB


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]  # What a user is created with
        extra_kwargs = {
            "password": {"write_only": True}
        }  # Make sure the password is only ever written, not read

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}
