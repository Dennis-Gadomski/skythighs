import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FlightLog } from 'src/app/core/interfaces/flight-log.interface';
import { DataGroup, DataItem, DataSet, Timeline, TimelineOptions } from "vis-timeline/standalone";

@Component({
  selector: 'app-vis-time-line',
  templateUrl: './vis-time-line.component.html',
  imports: [
    CommonModule,
    IonicModule,
  ],
  standalone: true,
  styleUrls: ['./vis-time-line.component.scss'],
})
export class VisTimeLineComponent implements AfterViewInit {

  @Input() flightLogs: FlightLog[] = [];
  @ViewChild('visualization') container: ElementRef | undefined;

  timeline: Timeline | undefined;
  isLoading = true;

  groups: DataGroup[] = [];

  ngAfterViewInit(): void {
    const groups = this.createGroups(this.flightLogs);
    const timelineItems = this.toTimelineItems(this.flightLogs);
    const options = this.getTimelineOptions();

    if (this.container?.nativeElement) {
      this.timeline = new Timeline(this.container.nativeElement, timelineItems, groups, options);
    }
  }

  private getTimelineOptions(): TimelineOptions {
    const height = '530px';
    const timelineMonthsOffset = 6;

    const options: TimelineOptions = {
      height,
      margin: {
        item: 1
      },
      autoResize: true,
      min: this.getFirstFlightDate(this.flightLogs, timelineMonthsOffset).valueOf(),
      max: this.getLastFlightDate(this.flightLogs, timelineMonthsOffset).valueOf(),
      start: new Date().setMonth(new Date().getMonth() - 1).valueOf(),
      end: new Date().setMonth(new Date().getMonth() + 1).valueOf(),
      onInitialDrawComplete: () => {
        this.isLoading = false;
      }
    };

    return options;
  }


  private toTimelineItems(flightLogs: FlightLog[]): DataItem[] {
    return flightLogs.map(flightLog => {
      return {
        id: flightLog.id,
        start: new Date(flightLog.departureTime),
        end: new Date(flightLog.arrivalTime),
        content: flightLog.aircraftRegistration,
        group: flightLog.aircraftRegistration
      };
    });
  }

  private createGroups(flightLog: FlightLog[]): DataGroup[] {
    const uniqueRegs = new Set(flightLog.map(flight => flight.aircraftRegistration));
    const aircraftRegs = Array.from(uniqueRegs).map(reg => ({ id: reg, content: reg }));
    return aircraftRegs;
  }

  private getFirstFlightDate(flightLogs: FlightLog[], monthsToSubtract: number): Date {
    const firstFlightDate = new Date(flightLogs.reduce((earliest, current) => current.departureTime < earliest.departureTime ? current : earliest).departureTime);
    firstFlightDate.setMonth(firstFlightDate.getMonth() - monthsToSubtract);
    return firstFlightDate;
  }

  private getLastFlightDate(flightLogs: FlightLog[], monthsToAdd: number): Date {
    const lastFlightDate = new Date(flightLogs.reduce((earliest, current) => current.departureTime > earliest.departureTime ? current : earliest).departureTime);
    lastFlightDate.setMonth(lastFlightDate.getMonth() + monthsToAdd);
    return lastFlightDate;
  }

}
