import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecommendationService } from 'src/Services/recommendation.service';

@Component({
  selector: 'app-hotels-restaurants',
  templateUrl: './hotels-restaurants.component.html',
  styleUrls: ['./hotels-restaurants.component.css'],
  animations: [
    trigger('cardAnimation', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate(300, style({ opacity: 1 }))
      ])
    ])
  ]
})



export class HotelsRestaurantsComponent implements OnInit {
  hotels: any[] = [];
  restaurants: any[] = [];
  error: string | null = null;

  constructor(private route: ActivatedRoute, private recommendationService: RecommendationService) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const subcategory_name = params['subcategory_name'];
      const price = params['price'];
      const country = params['country'];
      const city = params['city'];
      const duration = params['duration'];
  
      console.log('Received parameters:', { subcategory_name, price,country,city, duration });
  
      if (subcategory_name && price && duration && country && city) {
        this.recommendationService.getHotelsAndRestaurants(subcategory_name, price,country,city, duration).subscribe(
          (data: any) => {
            console.log('API response:', data);
            this.hotels = data.hotels || [];
            this.restaurants = data.restaurants || [];
          },
          error => {
            this.error = 'Failed to fetch hotels and restaurants';
            console.error(error);
          }
        );
      } else {
        this.error = 'Invalid parameters';
      }
    });
  }
  
}
