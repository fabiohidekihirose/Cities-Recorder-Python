from django.shortcuts import render
from rest_framework import generics, status
from .serializers import FavCitiesSerializer, WannaVisitSerializer, CommentsSerializer
from .models import FavCities, WannaVisit, Comments
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class FavCitiesView(APIView):
  queryset = FavCities.objects.all()
  serializer_class = FavCitiesSerializer

  def get(self, request):
    output = [{
      "id": output.id,
      "city_name": output.city_name, 
      "country_name": output.country_name,
      "lat": output.lat,
      "lng": output.lng
      } for output in FavCities.objects.all()]

    return Response(output)

  def post(self, request):
    data = {
            'city_name': request.data.get('city_name'), 
            'country_name': request.data.get('country_name'), 
            'lat': request.data.get('lat'),
            'lng': request.data.get('lng')
    }

    serializer = FavCitiesSerializer(data=data)

    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  def delete(self, request):
    id = request.query_params['id']
    city = FavCities.objects.filter(id=id)
    city.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)

class WannaVisitView(APIView):
  queryset = WannaVisit.objects.all()
  serializer_class = WannaVisitSerializer

  def get(self, request):
    output = [{
      "id": output.id,
      "city_name": output.city_name, 
      "country_name": output.country_name,
      "lat": output.lat,
      "lng": output.lng
    } for output in WannaVisit.objects.all()]

    return Response(output)

  def post(self, request):
    data = {
      'city_name': request.data.get('city_name'),
      'country_name': request.data.get('country_name'),
      'lat': request.data.get('lat'),
      'lng': request.data.get('lng')
    }

    serializer = WannaVisitSerializer(data=data)

    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  def delete(self, request):
    id = request.query_params['id']
    city = WannaVisit.objects.filter(id=id)
    city.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)

class CommentsView(APIView):
  queryset = Comments.objects.all()
  serializer_class = CommentsSerializer 

  def get(self, request):
    output = [{
      'id': output.id,
      'city_name': output.city_name,
      'comment': output.comment
    } for output in Comments.objects.all()]

    return Response(output)

  def post(self, request):
    data = {
      'city_name': request.data.get('city_name'),
      'comment': request.data.get('comment')
    }

    serializer = CommentsSerializer(data=data)

    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  def delete(self, request):
    id = request.query_params["id"]
    comment = Comments.objects.filter(id=id)
    comment.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)



