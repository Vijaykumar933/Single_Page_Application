from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse
from django.contrib.auth.models import User
from .models import Customer


class CustomerTests(APITestCase):

    def setUp(self):
        """Setup run before every test"""
        # Create a user for authentication
        self.user = User.objects.create_user(username='testuser', password='password123')
        self.client.login(username='testuser', password='password123')

        # Obtain a token and set it for the client
        self.token_url = reverse('token_obtain_pair')
        response = self.client.post(self.token_url, {'username': 'testuser', 'password': 'password123'}, format='json')
        self.token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)

        self.customer_data = {
            'first_name': 'John',
            'last_name': 'Doe',
            'date_of_birth': '1990-01-01',
            'phone_number': '1234567890',  # Valid phone number
        }
        self.url = reverse('customer-list-create')

    def test_create_customer(self):
        """Test the creation of a new customer"""
        response = self.client.post(self.url, self.customer_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Customer.objects.count(), 1)
        self.assertEqual(Customer.objects.get().phone_number, '1234567890')

    def test_create_customer_invalid_phone_number(self):
        """Test creating a customer with an invalid phone number"""
        invalid_data = self.customer_data.copy()
        invalid_data['phone_number'] = '123'  # Too short
        response = self.client.post(self.url, invalid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('phone_number', response.data)

    def test_create_duplicate_phone_number(self):
        """Test that creating a customer with a duplicate phone number fails"""
        # Create the first customer
        self.client.post(self.url, self.customer_data, format='json')

        # Attempt to create another customer with the same phone number
        response = self.client.post(self.url, self.customer_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('phone_number', response.data)

    def test_customer_list(self):
        """Test retrieving a list of customers"""
        # Create a customer
        self.client.post(self.url, self.customer_data, format='json')

        # Retrieve the list of customers
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['phone_number'], '1234567890')

    def test_retrieve_customer(self):
        """Test retrieving a specific customer"""
        # Create a customer
        response = self.client.post(self.url, self.customer_data, format='json')
        customer_id = response.data['id']

        # Retrieve the customer
        url = reverse('customer-retrieve-update-destroy', kwargs={'pk': customer_id})
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['phone_number'], '1234567890')

    def test_update_customer(self):
        """Test updating a customer's information"""
        # Create a customer
        response = self.client.post(self.url, self.customer_data, format='json')
        customer_id = response.data['id']

        # Update the customer's last name
        update_data = {'last_name': 'Smith'}
        url = reverse('customer-retrieve-update-destroy', kwargs={'pk': customer_id})
        response = self.client.patch(url, update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['last_name'], 'Smith')

    def test_delete_customer(self):
        """Test deleting a customer"""
        # Create a customer
        response = self.client.post(self.url, self.customer_data, format='json')
        customer_id = response.data['id']

        # Delete the customer
        url = reverse('customer-retrieve-update-destroy', kwargs={'pk': customer_id})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Customer.objects.count(), 0)
