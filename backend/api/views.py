from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note


class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):  # type: ignore
        user = (
            self.request.user
        )  # This is why we define it so we get all the objects in the authed user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):  # type: ignore
        user = (
            self.request.user
        )  # This is why we define it so we get all the objects in the authed user
        return Note.objects.filter(author=user)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class UserStatsView(generics.RetrieveAPIView):  # Changed inheritance
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):  # type: ignore
        # Return the current authenticated user
        return self.request.user
