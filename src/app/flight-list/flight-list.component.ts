import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FlightLogService } from '../core/services/flight-log.service';
import { FlightLog } from '../core/interfaces/flight-log.interface';
import { AircraftImageService } from '../core/services/aircraft-image.service';
import { Observable, from, map, mergeMap, switchMap, toArray } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-flight-list',
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  standalone: true,
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss'],
})
export class FlightListComponent implements OnInit {
  flightLogs: FlightLog[] = [];
  aircraftImages: { [key: string]: string } = {};

  private destroyRef = inject(DestroyRef);

  constructor(private flightLogService: FlightLogService, private aircraftImageService: AircraftImageService) { }

  ngOnInit(): void {
    this.flightLogService.getFlightLogs()
      .pipe(
        switchMap(flightLogs => {
          this.flightLogs = flightLogs;
          return this.getUniqueAircraftImages(flightLogs);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(images => this.updateAircraftImages(images));
  }

  getUniqueAircraftImages(flightLogs: FlightLog[]): Observable<{ registration: string, imageUrl: string }[]> {
    const uniqueRegistrations = new Set(flightLogs.map(log => log.aircraftRegistration));

    return from(Array.from(uniqueRegistrations)).pipe(
      mergeMap(registration => this.aircraftImageService.getImageForAircraft(registration).pipe(
        map(imageUrl => ({ registration, imageUrl }))
      )),
      toArray()
    );
  }

  updateAircraftImages(images: { registration: string, imageUrl: string }[]): void {
    images.forEach(({ registration, imageUrl }) => {
      this.aircraftImages[registration] = imageUrl;
    });
  }
}
