from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note
from datetime import datetime


# Will turn Python into JSON to handle the communication with the DB
class UserSerializer(serializers.ModelSerializer):
    total_notes = serializers.SerializerMethodField()
    last_note_date = serializers.SerializerMethodField()
    registration_date = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "password",
            "registration_date",
            "total_notes",
            "last_note_date",
        ]
        extra_kwargs = {"password": {"write_only": True}}
        read_only_fields = ["registration_date", "total_notes", "last_note_date"]

    def create(self, validated_data):
        """Create user ignoring read-only fields"""
        # Extract password separately
        password = validated_data.pop("password", None)
        user = User.objects.create(**validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user

    def get_total_notes(self, obj):
        """Calculate note count"""
        return obj.notes.count()

    def get_registration_date(self, obj):
        """Format registration date"""
        return obj.date_joined.strftime("%d-%m-%Y")

    def get_last_note_date(self, obj):
        """Find most recent note date"""
        last_note = obj.notes.order_by("-created_at").first()
        return last_note.created_at.strftime("%d-%m-%Y") if last_note else None


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}
