# views.py

from django.http import JsonResponse
from django.core.serializers import serialize
from .models import Tourism
from Circuitrecommender.models import Tourism
from .services.recommendations import recommend_destinations
import json
def recommend_destinations_view(request):
    subcategory_name = request.GET.get('subcategory_name')
    price = request.GET.get('price')
    duration = int(request.GET.get('duration', 1))
    
    # Créer les préférences de l'utilisateur basées sur les filtres
    user_preferences = f"{subcategory_name} {price}"
    
    # Obtenir les recommandations
    recommendations = recommend_destinations(user_preferences, duration)
    
    # Retourner les recommandations sous forme de JSON
    return JsonResponse(recommendations, safe=False)

def get_categories_view(request):
    # Obtenez toutes les catégories uniques depuis la base de données
    categories = Tourism.objects.values_list('category_name', flat=True).distinct()
    return JsonResponse({'categories': list(categories)})
def get_subcategories_view(request):
    category_name = request.GET.get('category_name')
    if not category_name:
        return JsonResponse({'error': 'Category name is required'}, status=400)
    
    # Obtenez toutes les sous-catégories uniques pour la catégorie donnée
    subcategories = Tourism.objects.filter(category_name=category_name).values_list('subcategory_name', flat=True).distinct()
    return JsonResponse({'subcategories': list(subcategories)})

def get_prices_view(request):
    subcategory_name = request.GET.get('subcategory_name')
    if not subcategory_name:
        return JsonResponse({'error': 'Subcategory name is required'}, status=400)
    
    # Obtenez toutes les options de prix uniques pour la sous-catégorie donnée
    prices = Tourism.objects.filter(subcategory_name=subcategory_name).values_list('price', flat=True).distinct()
    return JsonResponse({'prices': list(prices)})

def get_all_tourism_objects(request):
    tourism_objects = Tourism.objects.all()
    tourism_objects_list = list(tourism_objects.values())
    return JsonResponse(tourism_objects_list, safe=False)