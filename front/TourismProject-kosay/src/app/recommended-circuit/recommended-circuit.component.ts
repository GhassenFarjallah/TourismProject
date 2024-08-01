import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet';
import { RecommendationService } from 'src/Services/recommendation.service';
@Component({
  selector: 'app-recommended-circuit',
  templateUrl: './recommended-circuit.component.html',
  styleUrls: ['./recommended-circuit.component.css']
})
export class RecommendedCircuitComponent implements OnInit {
  recommendations: any[] = [];
  selectedDay: number | null = null;
  mapImage: string | null = null;
  showMap: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mapService: RecommendationService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        try {
          this.recommendations = JSON.parse(decodeURIComponent(params['data']));
        } catch (error) {
          console.error('Error parsing recommendations data', error);
        }
      }
    });
  }

  selectDay(dayIndex: number): void {
    this.selectedDay = dayIndex;
  }

  viewHotelsAndRestaurants(): void {
    if (this.recommendations && this.recommendations.length > 0) {
      const firstRecommendation = this.recommendations[0];
      console.log('First Recommendation:', firstRecommendation);

      const price = firstRecommendation.Price;

      if (price) {
        this.router.navigate(['/hotels-restaurants'], {
          queryParams: {
            subcategory_name: firstRecommendation.subcategory_name,
            price: price,
            duration: this.recommendations.length
          }
        }).then(() => {
          this.loadMapImage(firstRecommendation.subcategory_name, price, this.recommendations.length);
        });
      } else {
        console.error('Price is not defined');
      }
    } else {
      console.error('No recommendations available');
    }
  }

  private loadMapImage(subcategory: string, price: string, duration: number): void {
    this.mapService.getMapImage(subcategory, price, duration).subscribe(
      (blob: Blob) => {
        console.log('Map image blob received:', blob);
        const reader = new FileReader();
        reader.onloadend = () => {
          this.mapImage = reader.result as string;
          console.log('Map image URL:', this.mapImage);
        };
        reader.readAsDataURL(blob);
      },
      error => {
        console.error('Error loading map image', error);
      }
    );
  }
  

  toggleMap(): void {
    this.showMap = !this.showMap;
    if (this.showMap && this.recommendations.length > 0) {
      const firstRecommendation = this.recommendations[0];
      this.loadMapImage(firstRecommendation.subcategory_name, firstRecommendation.Price, this.recommendations.length);
    }
  }
}