from django.db import models
from django.core.validators import RegexValidator, MinLengthValidator


# Create your models here.

class Customer(models.Model):
    """
    class to create the customer model
    """
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    phone_number = models.CharField(
        max_length=15,
        unique=True,
        validators=[
            RegexValidator(
                regex=r'^\d{10,15}$',
                message='Phone number must be between 10 to 15 digits and numeric.',
            ),
            MinLengthValidator(10, 'Phone number must be at least 10 digits.')
        ]
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
