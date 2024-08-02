  
  import { HttpClient } from '@angular/common/http';
  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
  import { Router } from '@angular/router';
import { AuthService } from 'src/Services/auth.service';
  import { RecommendationService } from 'src/Services/recommendation.service';
  
  @Component({
    selector: 'app-trip-form',
    templateUrl: './trip-form.component.html',
    styleUrls: ['./trip-form.component.css']
  })
  export class TripFormComponent implements OnInit {
    tripForm!: FormGroup;
    recommendations!: any[];
    categories: string[] = [];
    subcategories: string[] = [];
    prices: string[] = [];
    countries: string[] =[];
    cities: string[] =[];
  
    constructor(private fb: FormBuilder, private recommendationService: RecommendationService,private router: Router,private authService:AuthService) { }
  
    ngOnInit(): void {
      this.tripForm = this.fb.group({
        category_name: ['', Validators.required],
        subcategory_name: ['', Validators.required],
        price: ['', Validators.required],
        dateDebut: ['', Validators.required],
        dateFin: ['', Validators.required],
        country_name: ['', Validators.required],
        city_name: ['', Validators.required],
      });

      console.log(console.log('Stored  tokens:', this.authService.getRefreshToken(),this.authService.getAccessToken()))

      this.loadCountries();
  
      // Fetch categories on initialization
      this.loadCategories();

      // Subscribe to country changes to fetch cities
      this.tripForm.get('country_name')?.valueChanges.subscribe(country => {
        if (country) {
          this.loadCities(country);
        } else {
          this.cities = [];
          this.tripForm.get('city_name')?.setValue('');
        }
      });
      // Subscribe to category changes to fetch subcategories
      this.tripForm.get('category_name')?.valueChanges.subscribe(category => {
        if (category) {
          this.loadSubcategories(category);
        } else {
          this.subcategories = [];
          this.tripForm.get('subcategory_name')?.setValue('');
        }
      });
  
      // Subscribe to subcategory changes to fetch prices
      this.tripForm.get('subcategory_name')?.valueChanges.subscribe(subcategory => {
        if (subcategory) {
          this.loadPrices(subcategory);
        } else {
          this.prices = [];
          this.tripForm.get('price')?.setValue('');
        }
      });
    }
  
    loadCategories(): void {
      this.recommendationService.getCategories().subscribe(
        (data: any) => this.categories = data['categories'],
        error => console.error('Error loading categories!', error)
      );
    }
    loadCountries(): void {
      this.recommendationService.getCountries().subscribe(
        (data: any) => this.countries = data['countries'],
        error => console.error('Error loading countries!', error)
      );
    }
    loadCities(country: string): void {
      this.recommendationService.getCities(country).subscribe(
        (data: any) => this.cities = data['cities'],
        error => console.error('Error loading cities!', error)
      );
    }
    loadSubcategories(category: string): void {
      this.recommendationService.getSubcategories(category).subscribe(
        (data: any) => this.subcategories = data['subcategories'],
        error => console.error('Error loading subcategories!', error)
      );
    }
  
    loadPrices(subcategory: string): void {
      this.recommendationService.getPrices(subcategory).subscribe(
        (data: any) => this.prices = data['prices'],
        error => console.error('Error loading prices!', error)
      );
    }
  
    // onSubmit(): void {
    //   if (this.tripForm.valid) {
    //     const formValues = this.tripForm.value;
    //     this.getRecommendations(formValues.subcategory_name, formValues.price, formValues.duration);
    //   }
    // }

    onSubmit(): void {
      if (this.tripForm.valid) {
        const formValues = this.tripForm.value;
        const duration = this.calculateDuration(formValues.dateDebut, formValues.dateFin)+1;
        localStorage.setItem('tripCompleted', 'true');
        this.recommendationService.getRecommendations(formValues.subcategory_name, formValues.price,formValues.country_name,formValues.city_name, duration).subscribe(
          (data: any[]) => {
            // Navigate to recommendations page with data
            this.router.navigate(['/recommended-circuit'], {
              queryParams: { data: JSON.stringify(data) }
            });
          },
          error => console.error('There was an error!', error)
        );

      }
    }
    calculateDuration(startDate: string, endDate: string): number {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const timeDiff = end.getTime() - start.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return daysDiff;
    }
  
  
    getRecommendations(subcategory_name: string, price: string,country:string,city:string, duration: number): void {
      this.recommendationService.getRecommendations(subcategory_name, price,country,city, duration).subscribe(
        (data: any[]) => this.recommendations = data,
        error => console.error('There was an error!', error)
      );
    }
  }
 
  