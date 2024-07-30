from django.shortcuts import render


def give_nearest_destinations(request):
  
# Create your views here.
  recommendations = request.GET.get('recommendations')
  