import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FlightLog } from '../interfaces/flight-log.interface';
import { environment } from '../../../environments/environment';
import { AirportVisit } from '../interfaces/airport-visit.interface';
import { ResourceResponse } from '../interfaces/resource-response.interface';

@Injectable({
  providedIn: 'root',
})
export class FlightLogService {

  private FLIGHTS_ENDPOINT = 'flights';
  private UNIQUE_AIRPORTS_ENDPOINT = 'flights/unique-airports';


  constructor(private http: HttpClient) { }

  getFlightLogs(): Observable<FlightLog[]> {
    return this.http.get<ResourceResponse<FlightLog[]>>(`${environment.API_URL}/${this.FLIGHTS_ENDPOINT}`).pipe(
      map(response => response.data)
    );
  }

  getFlightLogById(id: string): Observable<FlightLog> {
    return this.http.get<FlightLog>(`${environment.API_URL}/${this.FLIGHTS_ENDPOINT}/${id}`)
  }

  getAirportsVisited(): Observable<AirportVisit[]> {
    return this.http.get<AirportVisit[]>(`${environment.API_URL}/${this.UNIQUE_AIRPORTS_ENDPOINT}`);
  }
}
