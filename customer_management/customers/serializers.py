from rest_framework import serializers
from .models import Customer


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'first_name', 'last_name', 'date_of_birth', 'phone_number']

    def validate_phone_number(self, value):
        """
        Validate that the phone number is unique except for the current instance being updated.
        """
        request = self.context.get('request')
        if request and request.method == 'PUT':
            customer_id = request.parser_context['kwargs'].get('pk')
            if Customer.objects.exclude(id=customer_id).filter(phone_number=value).exists():
                raise serializers.ValidationError("Phone number already exists.")
        elif Customer.objects.filter(phone_number=value).exists():
            raise serializers.ValidationError("Phone number already exists.")
        return value
