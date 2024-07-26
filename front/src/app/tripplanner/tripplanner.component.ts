import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

interface ActivityCategory {
  name: string;
  subcategories: string []; // Optional: For adding icons
}
@Component({
  selector: 'app-tripplanner',
  templateUrl: './tripplanner.component.html',
  styleUrls: ['./tripplanner.component.css']
})
export class TripplannerComponent {

  tripPlannerForm: FormGroup;
  destinations: string[] = []; // Replace with actual data
  activityCategories: ActivityCategory[] = [
    { name: 'Historical', subcategories: ['Sights & Landmarks', 'Museums'] },
    { name: 'Adventure & Nature', subcategories: ['Nature', 'Adventure'] },
    { name: 'Culinary', subcategories: ['Cafes', 'Restaurants'] }
  ];
  numberOfPeople: number = 1;

  constructor(private fb: FormBuilder) {
    this.tripPlannerForm = this.fb.group({
      destination: [''],
      dates: [''],
      activities: this.fb.array([]),
    });
  }

  get activitiesControl() {
    return this.tripPlannerForm.get('activities') as FormArray;
  }
  selectCategory(event: Event) {
    const button = event.target as HTMLButtonElement;
    const category = button.textContent; // Assuming category name is in button text
  
    // Remove 'selected' class from all buttons
    const buttons = document.querySelectorAll('.activity-button');
    buttons.forEach(button => button.classList.remove('selected'));
  
    // Add 'selected' class to the clicked button
    button.classList.add('selected');
  }
  
  

  onSubmit() {
    const formData = this.tripPlannerForm.value;
    // Handle form submission and send data to backend
  }
}
