import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FlightLogService } from '../core/services/flight-log.service';
import { FlightLog } from '../core/interfaces/flight-log.interface';
import { AircraftImageService } from '../core/services/aircraft-image.service';
import { Observable, from, map, mergeMap, toArray } from 'rxjs';

@Component({
  selector: 'app-time-line',
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  standalone: true,
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss'],
})
export class TimeLineComponent implements OnInit {

  flightLogs: FlightLog[] = [];
  aircraftImages: { [key: string]: string } = {};

  constructor(private flightLogService: FlightLogService, private aircraftImageService: AircraftImageService) { }

  ngOnInit(): void {
    this.flightLogService.getFlightLogs()
      .pipe(
        mergeMap(flightLogs => {
          this.flightLogs = flightLogs;
          return this.getUniqueAircraftImages(flightLogs);
        })
      )
      .subscribe(images => this.updateAircraftImages(images));
  }

  getUniqueAircraftImages(flightLogs: FlightLog[]): Observable<{ registration: string, imageUrl: string }[]> {
    const uniqueRegistrations = new Set(flightLogs.map(log => log.aircraftRegistration));

    return from(Array.from(uniqueRegistrations)).pipe(
      mergeMap(registration => this.getAircraftImage(registration).pipe(
        map(imageUrl => ({ registration, imageUrl }))
      )),
      toArray()
    );
  }

  getAircraftImage(registration: string): Observable<string> {
    return this.aircraftImageService.getImageForAircraft(registration);
  }

  updateAircraftImages(images: { registration: string, imageUrl: string }[]): void {
    images.forEach(({ registration, imageUrl }) => {
      this.aircraftImages[registration] = imageUrl;
    });
  }
}