from django.db import models

# Create your models here.
class FavCities(models.Model):
  city_name = models.CharField(max_length=32, unique=True, null=False)
  country_name = models.CharField(max_length=32, null=False)
  lat = models.FloatField(null=False)
  lng = models.FloatField(null=False)

class WannaVisit(models.Model):
  city_name = models.CharField(max_length=32, unique=True, null=False)
  country_name = models.CharField(max_length=32, null=False)
  lat = models.FloatField(null=False)
  lng = models.FloatField(null= False)

class Comments(models.Model):
  city_name = models.CharField(max_length=32)
  comment = models.CharField(max_length=200)