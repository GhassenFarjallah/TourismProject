import { TestBed } from '@angular/core/testing';

import { DestinationsServiceService } from './destinations-service.service';

describe('DestinationsServiceService', () => {
  let service: DestinationsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestinationsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
