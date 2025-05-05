from rest_framework import serializers
from .models import CustomUser

# For User registration
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'password', 'email', 'phone_number', 'address']

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
            phone_number=validated_data.get('phone_number'),
            address=validated_data.get('address')
        )
        return user

# For Login (no password validation, just return tokens)
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
