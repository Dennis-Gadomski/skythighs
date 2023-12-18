import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FlightLogService } from '../core/services/flight-log.service';
import { FlightLog } from '../core/interfaces/flight-log.interface';
import { AircraftImageService } from '../core/services/aircraft-image.service';
import { Observable, from, map, mergeMap, switchMap, toArray } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { VisTimeLineComponent } from '../shared/vis-time-line/vis-time-line.component';


@Component({
  selector: 'app-time-line',
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisTimeLineComponent
  ],
  standalone: true,
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss'],
})
export class TimeLineComponent implements OnInit {
  flightLogs: FlightLog[] = [];
  aircraftImages: { [key: string]: string } = {};

  private destroyRef = inject(DestroyRef);

  constructor(private flightLogService: FlightLogService, private aircraftImageService: AircraftImageService) { }

  ngOnInit(): void {
    this.flightLogService.getFlightLogs()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(flightLogs => this.flightLogs = flightLogs);
  }
}