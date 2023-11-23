import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FlightLogService } from '../core/services/flight-log.service';
import { FlightLog } from '../core/interfaces/flight-log.interface';

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

  constructor(private flightLogService: FlightLogService) { }

  ngOnInit(): void {
    this.flightLogService.getFlightLogs().subscribe(flightLogs => {
      this.flightLogs = flightLogs;
    });
  }

}
