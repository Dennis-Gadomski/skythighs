import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { of, switchMap } from 'rxjs';

import { FlightLogFlightForm } from 'src/app/core/interfaces/flight-log-form.interface';
import { FlightLog } from 'src/app/core/interfaces/flight-log.interface';
import { FlightLogService } from 'src/app/core/services/flight-log.service';
import { DateConverterUtil } from 'src/app/core/utils/date-converter.util';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  standalone: true,
  selector: 'app-flight-log-edit',
  templateUrl: './flight-log-edit.component.html',
  styleUrls: ['./flight-log-edit.component.scss'],
})
export class FlightLogEditComponent implements OnInit {
  flightLog: FlightLog | null = null;
  flightLogFlightForm: FormGroup<FlightLogFlightForm>;

  private destroyRef = inject(DestroyRef);

  constructor(private flightLogService: FlightLogService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    // TODO: add validation
    this.flightLogFlightForm = fb.nonNullable.group({
      picName: '',
      flightTime: 0,
      departurePlace: '',
      departureTime: new Date(),
      arrivalPlace: '',
      arrivalTime: new Date(),
    });
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        let id = params.get('id');
        return id ? this.flightLogService.getFlightLogById(id) : of(null);
      }),
      takeUntilDestroyed(this.destroyRef))
      .subscribe((flightLog) => {
        // TODO: error handling
        this.flightLog = flightLog;
        this.initForm();
      });
  }

  // TODO: date handling in custom component and just use form binding
  updateTime(event: CustomEvent, isArrival: boolean): void {
    if (isArrival) {
      this.flightLogFlightForm.controls.arrivalTime.patchValue(new Date(event.detail.value));
      return;
    }
    this.flightLogFlightForm.controls.departureTime.patchValue(new Date(event.detail.value));
  }

  saveFlightLog(): void {
    if (!this.flightLog) {
      return;
    }

    const { picName, flightTime, departurePlace, departureTime, arrivalPlace, arrivalTime } = this.flightLogFlightForm.value;

    const updatedFlightLog = {
      ...this.flightLog,
      picName: picName ?? this.flightLog.picName,
      flightTime: flightTime ?? this.flightLog.flightTime,
      departurePlace: departurePlace ?? this.flightLog.departurePlace,
      departureTime: departureTime ? DateConverterUtil.convertDateToMysqlDate(departureTime) : this.flightLog.departureTime,
      arrivalPlace: arrivalPlace ?? this.flightLog.arrivalPlace,
      arrivalTime: arrivalTime ? DateConverterUtil.convertDateToMysqlDate(arrivalTime) : this.flightLog.arrivalTime,
    };

    this.flightLogService.updateFlightLog(updatedFlightLog).subscribe(updatedLog => {
      if (updatedLog?.id) {
        this.router.navigate(['/flight-log-details', updatedLog?.id]);
      }
    });
  }

  private initForm(): void {
    if (!this.flightLog) {
      return;
    }
    // TODO: create service for this?
    this.flightLogFlightForm.setValue({
      picName: this.flightLog.picName,
      flightTime: this.flightLog.flightTime,
      departurePlace: this.flightLog.departurePlace,
      departureTime: new Date(this.flightLog.departureTime),
      arrivalPlace: this.flightLog.arrivalPlace,
      arrivalTime: new Date(this.flightLog.arrivalTime)
    })
  }


}
