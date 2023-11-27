import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AirportService } from './airport.service';
import { environment } from 'src/environments/environment';
import { Airport } from '../interfaces/airport.interface';

fdescribe('AirportService', () => {
  let service: AirportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AirportService]
    });

    service = TestBed.inject(AirportService);
  });

  it('should return airport data for the given ident', () => {
    // ARRANGE
    const TEST_IDENT = 'EHBK';
    const mockResponse = {
      data: {
        id: 1,
        ident: TEST_IDENT,
        name: 'Maastricht-Aachen airport',
      } as Airport
    };
    const httpTestingController = TestBed.inject(HttpTestingController);
    const testIdent = 'TEST_IDENT';

    // ACT ASSERT
    service.getAiportDataByIdent(testIdent).subscribe(airport => {
      expect(airport).toEqual(mockResponse.data);
    });
    const req = httpTestingController.expectOne(`${environment.API_URL}/airports/${testIdent}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });
});
