from django.db import models
from django.core.validators import RegexValidator
class Hotels(models.Model):
  address = models.CharField(max_length=255,null=False)
  category = models.CharField(max_length=32,null=False)
  description = models.CharField(max_length=255,null=False)
  email = models.EmailField(max_length=128)
  hotelClass = models.FloatField(null=True, blank=True)
  image = models.URLField(max_length=1024, null=True, blank=True)
  latitude = models.FloatField(null=True, blank=True)
  longitude = models.FloatField(null=True, blank=True)
  name = models.CharField(max_length=64,null=False)
  
  phoneNumberRegex = RegexValidator(regex = r"^\+?1?\d{8,15}$")
  phone = models.CharField(validators = [phoneNumberRegex], max_length = 16, unique = True)
  
  priceLevel = models.CharField(max_length=32)
  rating = models.FloatField(null=True, blank=True)
  subcategories = models.CharField(max_length=64)
  website = models.URLField(max_length=1028)
  amenities=models.CharField(max_length=128)
# Create your models here.