from rest_framework import serializers
from .models import FavCities, WannaVisit, Comments

class CommentsSerializer(serializers.ModelSerializer):
  class Meta:
    model = Comments
    fields = ("id", "city_name", "comment")

class FavCitiesSerializer(serializers.ModelSerializer):
  class Meta:
    model = FavCities
    fields = ("id", "city_name", "country_name", "lat", "lng")

class  WannaVisitSerializer(serializers.ModelSerializer):
  class Meta:
    model = WannaVisit
    fields = ("id", "city_name", "country_name", "lat", "lng")

