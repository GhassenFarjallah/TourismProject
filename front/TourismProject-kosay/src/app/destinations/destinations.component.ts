import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DestinationsServiceService } from 'src/Services/destinations-service.service';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit {
  destinations: any[] = [];

  constructor(private destinationsService:DestinationsServiceService){}
  ngOnInit(): void {
      this.getAllDestinations();
  }
  getAllDestinations(): void {
    this.destinationsService.getDestinations().subscribe((data: any) => {
      this.destinations = data;
    });
  }
}