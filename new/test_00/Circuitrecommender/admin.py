from django.contrib import admin
from .models import *

@admin.register(Tourism)
class TourismAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'category_name', 'subcategory_name', 'subsubcategory',
        'rating', 'url', 'name', 'address', 'latitude', 'longitude', 'price',
        'GoodFor', 'Duration','Country','City','destinations_features'
    )
    search_fields = (
        'name', 'address', 'category_name', 'subcategory_name',
        'subsubcategory','destinations_features','price'
    )