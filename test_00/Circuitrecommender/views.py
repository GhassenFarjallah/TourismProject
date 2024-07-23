from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Tourism
from .serializers import TourismSerializer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

class RecommendationView(APIView):
    def get(self, request):
        user_preferences = request.query_params.get('preferences')
        
        if not user_preferences:
            return Response({"error": "Preferences are required"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Load all tourism data
        tourisms = Tourism.objects.all()
        tourisms_df = pd.DataFrame(list(tourisms.values()))
        
        if tourisms_df.empty:
            return Response({"error": "No tourism data available"}, status=status.HTTP_404_NOT_FOUND)
        
        # Combine relevant features into a single string
        tourisms_df['combined_features'] = tourisms_df.apply(
            lambda row: f"{row['category_name']} {row['subcategory_name']} {row['subsubcategory']} {row['cuisine']} {row['Dietaryrestrictions']} {row['Meals']} {row['price']} {row['Dishes']} {row['GoodFor']} {row['Duration']}",
            axis=1
        )

        # Vectorize the features
        vectorizer = TfidfVectorizer()
        feature_vectors = vectorizer.fit_transform(tourisms_df['combined_features'])
        
        # Vectorize the user preferences
        user_vector = vectorizer.transform([user_preferences])
        
        # Calculate cosine similarity
        similarities = cosine_similarity(user_vector, feature_vectors)
        
        # Get the top 5 recommendations
        top_indices = similarities[0].argsort()[-5:][::-1]
        top_ids = tourisms_df.iloc[top_indices]['id'].tolist()  # Extract IDs of top recommendations

        # Retrieve the top tourism instances from the database
        top_tourisms = Tourism.objects.filter(id__in=top_ids)
        
        # Serialize the recommendations
        serializer = TourismSerializer(top_tourisms, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)