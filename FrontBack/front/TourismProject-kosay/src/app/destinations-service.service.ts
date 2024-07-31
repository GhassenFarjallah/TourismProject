import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DestinationsServiceService {
  readonly API_URL = "http://localhost:8000"
  readonly ENDPOINT_RECETTES = "/destinations/"

  constructor(private httpClient: HttpClient) { 
    
    
  }

  getDestinations(){
    return this.httpClient.get(this.API_URL+this.ENDPOINT_RECETTES)
  }
}
