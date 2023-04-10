from django.urls import path
from .views import FavCitiesView, WannaVisitView, CommentsView

urlpatterns = [
  path('favCities', FavCitiesView.as_view()),
  path('wannaVisit', WannaVisitView.as_view()),
  path('comments', CommentsView.as_view())
]