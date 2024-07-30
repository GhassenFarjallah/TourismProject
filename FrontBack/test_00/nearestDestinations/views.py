from django.shortcuts import render
from math import radians, sin, cos, sqrt, atan2
import numpy as np
from heapq import heappop, heappush
import folium
from IPython.display import display

def give_nearest_destinations(request):
  
# Create your views here.
  recommendations = request.GET.get('recommendations')
  return ""


def haversine_distance(lon1, lat1, lon2, lat2):
  """
    Calculate the great-circle distance between two points
    on the Earth's surface given their longitudes and latitudes
    in degrees.
  """
  R = 6371.0  # Radius of the Earth in kilometers
  lon1_rad = radians(lon1)
  lat1_rad = radians(lat1)
  lon2_rad = radians(lon2)
  lat2_rad = radians(lat2)

  dlon = lon2_rad - lon1_rad
  dlat = lat2_rad - lat1_rad

  a = sin(dlat / 2)**2 + cos(lat1_rad) * cos(lat2_rad) * sin(dlon / 2)**2
  c = 2 * atan2(sqrt(a), sqrt(1 - a))

  distance = R * c
  return distance


# Djikstra Algorithm

def nearest_hotel(target_lon, target_lat, df):
    distances = {index: np.inf for index, row in df.iterrows()}
    distances_heap = [(0, None, target_lon, target_lat)]  # (distance, previous index, lon, lat)
    visited = set()
    nearest_hotels=[]
    while distances_heap:
        current_dist, prev_index, lon, lat = heappop(distances_heap)

        if prev_index is not None and prev_index in visited:
            continue

        visited.add(prev_index)

        for index, row in df.iterrows():
            if index in visited:
                continue

            if pd.notna(row['longitude']) and pd.notna(row['latitude']):
                dist = haversine_distance(lon, lat, row['longitude'], row['latitude'])
                new_dist = current_dist + dist

                if new_dist < distances[index]:
                    distances[index] = new_dist
                    heappush(distances_heap, (new_dist, index, row['longitude'], row['latitude']))

    nearest_index = min(distances, key=distances.get)
    nearest_hotel = df.loc[nearest_index]
    nearest_hotels.append(nearest_hotel['name'])
    del distances[nearest_index]
    nearest_index2=min(distances, key=distances.get)
    nearest_hotels.append(df.loc[nearest_index2]['name'])
    del distances[nearest_index2]
    nearest_index3=min(distances, key=distances.get)
    nearest_hotels.append(df.loc[nearest_index3]['name'])
    del distances[nearest_index3]
    return nearest_hotels