import { TestBed } from '@angular/core/testing';

import { AircraftImageService } from './aircraft-image.service';

describe('AircraftImageService', () => {
  let service: AircraftImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AircraftImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
