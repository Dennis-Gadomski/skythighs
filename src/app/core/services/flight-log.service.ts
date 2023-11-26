import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FlightLog } from '../interfaces/flight-log.interface';
import { environment } from '../../../environments/environment';
import { AirportVisit } from '../interfaces/airport-visit.interface';

@Injectable({
  providedIn: 'root',
})
export class FlightLogService {

  FLIGHTS_ENDPOINT = 'flights';
  UNIQUE_AIRPORTS_ENDPOINT = 'flights/unique-airports';


  constructor(private http: HttpClient) { }

  getFlightLogs(): Observable<FlightLog[]> {
    return this.http.get<{ data: FlightLog[] }>(`${environment.API_URL}/${this.FLIGHTS_ENDPOINT}`).pipe(
      map(response => response.data)
    );
  }

  getAirportsVisited(): Observable<AirportVisit[]> {
    return this.http.get<AirportVisit[]>(`${environment.API_URL}/${this.UNIQUE_AIRPORTS_ENDPOINT}`);
  }
}
