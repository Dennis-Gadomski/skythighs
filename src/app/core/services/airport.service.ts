import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Airport } from '../interfaces/airport.interface';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  API_AIRPORTS = 'airports';

  constructor(private http: HttpClient) { }


  getAiportDataByIdent(ident: string): Observable<Airport> {
    return this.http.get<{ data: Airport }>(`${environment.API_URL}/${this.API_AIRPORTS}/${ident}`).pipe(
      map(airportData => airportData.data)
    );
  }
}
