// home.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {
  userName = 'John Doe'; // 👈 Tu peux le récupérer depuis un service plus tard
  currentDate = new Date().toLocaleDateString();
  todoDonePercent = 0;
  myTasks = 6;
  bugs = 0;
  stories = 0;
  pv = 0;
  ev = 0;
  ac = 7;
  svPercent = 0;
  cvPercent = -100.00;
}