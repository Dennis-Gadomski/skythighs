import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FlightLog } from '../interfaces/flight-log.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FlightLogService {

  FLIGHTS_ENDPOINT = 'flights';

  constructor(private http: HttpClient) { }

  getFlightLogs(): Observable<FlightLog[]> {
    return this.http.get<{ data: FlightLog[] }>(`${environment.API_URL}/${this.FLIGHTS_ENDPOINT}`).pipe(
      map(response => response.data)
    );
  }
}
