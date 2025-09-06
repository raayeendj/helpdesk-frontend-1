import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  tickets: any[] = [];

  ticketsToHandle: any[] = [];
  myOpenTickets: any[] = [];
  last7DaysTickets: any[] = [];
  openTickets: any[] = [];

  statusCounts = {
    open: 0,
    pending: 0,
    onHold: 0,
    solved: 0,
    closed: 0,
    spam: 0
  };

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe({
      next: (data: any[]) => {
        this.tickets = data || [];
        this.updateSidebarCounts();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des tickets', err);
      }
    });
  }

  updateSidebarCounts(): void {
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);

    this.ticketsToHandle = this.tickets.filter(t => t.status?.toLowerCase() === 'open');
    this.myOpenTickets = this.tickets.filter(t => t.assignee && t.status?.toLowerCase() === 'open');
    this.last7DaysTickets = this.tickets.filter(t => new Date(t.createdAt) >= sevenDaysAgo);
    this.openTickets = this.tickets.filter(t => t.status?.toLowerCase() === 'open');

    this.statusCounts.open = this.tickets.filter(t => t.status?.toLowerCase() === 'open').length;
    this.statusCounts.pending = this.tickets.filter(t => t.status?.toLowerCase() === 'pending').length;
    this.statusCounts.onHold = this.tickets.filter(t => t.status?.toLowerCase() === 'on hold').length;
    this.statusCounts.solved = this.tickets.filter(t => t.status?.toLowerCase() === 'solved').length;
    this.statusCounts.closed = this.tickets.filter(t => t.status?.toLowerCase() === 'closed').length;
    this.statusCounts.spam = this.tickets.filter(t => t.status?.toLowerCase() === 'spam').length;
  }
}
