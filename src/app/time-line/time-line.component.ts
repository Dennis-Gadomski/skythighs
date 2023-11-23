import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-time-line',
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  standalone: true,
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss'],
})
export class TimeLineComponent {

  constructor() { }

}
