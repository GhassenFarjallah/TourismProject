import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-recommended-circuit',
  templateUrl: './recommended-circuit.component.html',
  styleUrls: ['./recommended-circuit.component.css']
})
export class RecommendedCircuitComponent implements OnInit {
  recommendations: any[] = [];

  constructor(private router: ActivatedRoute ) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      if (params['data']) {
        try {
          this.recommendations = JSON.parse(decodeURIComponent(params['data']));
        } catch (error) {
          console.error('Error parsing recommendations data', error);
        }
      }
    });
}
}