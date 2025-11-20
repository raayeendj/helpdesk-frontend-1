import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Last7DaysData {
  ticketsCreated: number;
  ticketsClosed: number;
  avgResponseTime: string;
  avgResolutionTime: string;
  satisfactionRate: number;
  dailyTickets: { date: string; count: number }[];
}

@Component({
  selector: 'app-last-7-days',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './last-7-days.component.html',
  styleUrls: ['./last-7-days.component.scss']
})
export class Last7DaysComponent implements OnInit {
  data: Last7DaysData = {
    ticketsCreated: 0,
    ticketsClosed: 0,
    avgResponseTime: '0h',
    avgResolutionTime: '0h',
    satisfactionRate: 0,
    dailyTickets: []
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadLast7DaysData();
  }

  loadLast7DaysData() {
    // TODO: Replace with actual API endpoint
    // this.http.get<Last7DaysData>('http://localhost:3000/api/reports/last-7-days')
    //   .subscribe(data => this.data = data);
    
    // Mock data for now
    this.data = {
      ticketsCreated: 45,
      ticketsClosed: 38,
      avgResponseTime: '2h 15m',
      avgResolutionTime: '8h 30m',
      satisfactionRate: 92,
      dailyTickets: [
        { date: this.getDateLabel(6), count: 8 },
        { date: this.getDateLabel(5), count: 6 },
        { date: this.getDateLabel(4), count: 7 },
        { date: this.getDateLabel(3), count: 5 },
        { date: this.getDateLabel(2), count: 9 },
        { date: this.getDateLabel(1), count: 4 },
        { date: this.getDateLabel(0), count: 6 }
      ]
    };
  }

  getDateLabel(daysAgo: number): string {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  getMaxTickets(): number {
    return Math.max(...this.data.dailyTickets.map(d => d.count));
  }

  getBarHeight(count: number): number {
    const max = this.getMaxTickets();
    return max > 0 ? (count / max) * 100 : 0;
  }
}
