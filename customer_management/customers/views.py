from django.shortcuts import render

# Create your views here.

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Customer
from .serializers import CustomerSerializer


class CustomerListCreateView(generics.ListCreateAPIView):
    """
    Used for read-write endpoints to represent a collection of model instances.
    Provides get and post method handlers.
    """
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]


class CustomerRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    Used for read-write-delete endpoints to represent a single model instance.
    Provides get, put, patch and delete method handlers.
    """
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]
