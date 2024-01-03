import { FormControl } from "@angular/forms";

export interface FlightLogFlightForm {
    picName: FormControl<string>;
    flightTime: FormControl<number>;
    departurePlace: FormControl<string>;
    departureTime: FormControl<Date>;
    arrivalPlace: FormControl<string>;
    arrivalTime: FormControl<Date>;
}

export interface FlightLogAircraftForm {
    aircraft: FormControl<string>;
    aircraftRegistration: FormControl<string>;
    SE: FormControl<number>;
    ME: FormControl<number>;
}

export interface FlightLogAdditionalInfoForm {
    dayLanding: FormControl<number>;
    nightLanding: FormControl<number>;
    flightTimePic?: FormControl<number>;
    flightTimeCP?: FormControl<number>;
    flightTimeDual?: FormControl<number>;
    flightTimeInstructor?: FormControl<number>;
    remarks: FormControl<string>;
}
