from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    image_small = models.ImageField(upload_to='avatars/', null=True, blank=True)
    image_medium = models.ImageField(upload_to='avatars/', null=True, blank=True)
    image_large = models.ImageField(upload_to='avatars/', null=True, blank=True)
    
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.email