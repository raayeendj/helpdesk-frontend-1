import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket-satisfaction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-satisfaction.component.html',
  styleUrls: ['./ticket-satisfaction.component.scss']
})

export class TicketSatisfactionComponent {
  // Mock stats data
  summary = [
    { label: 'Rated great', value: 80, percent: '80%' },
    { label: 'Rated okay', value: 100, percent: '10%' },
    { label: 'Rated bad', value: 10, percent: '10%' }
  ];

  teams = [
    { name: 'Team A', okay: '11% (11)', bad: '0% (0)', great: '89% (89)' },
    { name: 'Team B', okay: '8% (8)', bad: '10% (10)', great: '82% (82)' },
    { name: 'Team C', okay: '13% (13)', bad: '10% (10)', great: '77% (77)' },
    { name: 'Team D', okay: '34% (34)', bad: '10% (10)', great: '66% (66)' }
  ];
}
