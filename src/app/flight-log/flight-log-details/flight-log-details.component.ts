import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FlightLogService } from '../../core/services/flight-log.service';
import { FlightLog } from '../../core/interfaces/flight-log.interface';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  standalone: true,
  selector: 'app-flight-log-details',
  templateUrl: './flight-log-details.component.html',
  styleUrls: ['./flight-log-details.component.scss'],
})
export class FlightLogDetailsComponent implements OnInit {

  flightLog: FlightLog | null = null;

  private destroyRef = inject(DestroyRef);

  constructor(private flightLogService: FlightLogService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        let id = params.get('id');
        return id ? this.flightLogService.getFlightLogById(id) : of(null);
      }),
      takeUntilDestroyed(this.destroyRef))
      .subscribe((flightLog) => {
        // TODO: show error notification when no flight exist
        this.flightLog = flightLog;
      });
  }
}
