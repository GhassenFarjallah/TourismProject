// recommendation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  private apiUrl = 'http://127.0.0.1:8000/recommend-destinations/';

  constructor(private http: HttpClient) { }

  getRecommendations(subcategory_name: string, price: string,country:string,city:string, duration: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {
      params: {
        subcategory_name,
        price,
        country,
        city,
        duration: duration.toString()
      }
    });
  }

  

  private apiUrl1 = 'http://127.0.0.1:8000/api';  // URL de votre API

  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl1}/get-countries/`);
  }
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl1}/get-categories/`);
  }
  getCities(Country:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl1}/get-cities/`, {
      params: { country: Country }
    });
  }

  getSubcategories(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl1}/get-subcategories/`, {
      params: { category_name: category }
    });
  }

  getPrices(subcategory: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl1}/get-prices/`, {
      params: { subcategory_name: subcategory }
    });
  }
  private baseUrl = 'http://127.0.0.1:8000';

  getHotelsAndRestaurants(subcategory_name: string, price: string,country:string,city:string, duration: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/recommend_hotels_and_restaurants_near_recommendations/`, {
      params: {
        subcategory_name,
        price,
        country,
        city,
        duration: duration.toString()
      }
    });
  }
  private apiUrl2 = 'http://127.0.0.1:8000/api/map-image/';



  getMapImage(subcategory: string, price: string,country:string,city:string, duration: number): Observable<Blob> {
    const url = `${this.apiUrl2}?subcategory_name=${encodeURIComponent(subcategory)}&price=${encodeURIComponent(price)}&country=${country}&city=${city}&duration=${duration}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
  
