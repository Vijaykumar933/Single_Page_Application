from django.db import models


# Create your models here.

class Customer(models.Model):
    """
    class to create the customer model
    """
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    phone_number = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
