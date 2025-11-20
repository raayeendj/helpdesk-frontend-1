import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TicketService, Ticket, TicketStats } from '../services/ticket.service';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];
  teams: any[] = [];
  ticketStats: TicketStats | null = null;
  
  // Filtres
  selectedStatus: string = 'all';
  selectedPriority: string = 'all';
  selectedTeam: string = 'all';
  searchTerm: string = '';
  
  // Options de filtres
  statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'Open', label: 'Open' },
    { value: 'Pending', label: 'Pending' },
    { value: 'On Hold', label: 'On Hold' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Closed', label: 'Closed' }
  ];

  priorityOptions = [
    { value: 'all', label: 'All Priority' },
    { value: 'Low', label: 'Low' },
    { value: 'Normal', label: 'Normal' },
    { value: 'High', label: 'High' },
    { value: 'Critical', label: 'Critical' }
  ];

  teamOptions: any[] = [];

  constructor(
    private ticketService: TicketService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.loadTickets();
    this.loadTeams();
    this.loadTicketStats();
  }

  loadTickets(): void {
    this.ticketService.getTickets().subscribe({
      next: (data: Ticket[]) => {
        this.tickets = data || [];
        this.applyFilters();
      },
      error: (err) => console.error('Erreur chargement tickets', err)
    });
  }

  loadTeams(): void {
    this.teamService.getTeams().subscribe({
      next: (data: any[]) => {
        this.teams = data || [];
        this.teamOptions = [
          { value: 'all', label: 'All Teams' },
          ...this.teams.map(team => ({ value: team.name, label: team.name }))
        ];
      },
      error: (err) => console.error('Erreur chargement teams', err)
    });
  }

  loadTicketStats(): void {
    this.ticketService.getTicketStats().subscribe({
      next: (stats: TicketStats) => {
        this.ticketStats = stats;
      },
      error: (err) => console.error('Erreur chargement stats', err)
    });
  }

  applyFilters(): void {
    this.filteredTickets = this.tickets.filter(ticket => {
      // Filtre par statut
      if (this.selectedStatus !== 'all' && ticket.status !== this.selectedStatus) {
        return false;
      }

      // Filtre par priorité
      if (this.selectedPriority !== 'all' && ticket.priority !== this.selectedPriority) {
        return false;
      }

      // Filtre par équipe
      if (this.selectedTeam !== 'all' && ticket.team !== this.selectedTeam) {
        return false;
      }

      // Filtre par recherche
      if (this.searchTerm) {
        const searchLower = this.searchTerm.toLowerCase();
        return (
          ticket.subject.toLowerCase().includes(searchLower) ||
          ticket.requesterName.toLowerCase().includes(searchLower) ||
          ticket.requesterEmail.toLowerCase().includes(searchLower) ||
          ticket.assignee?.toLowerCase().includes(searchLower) ||
          ticket.message.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.selectedStatus = 'all';
    this.selectedPriority = 'all';
    this.selectedTeam = 'all';
    this.searchTerm = '';
    this.applyFilters();
  }

  getStatusBadgeClass(status: Ticket['status']): string {
    return this.ticketService.getStatusBadgeClass(status);
  }

  getPriorityBadgeClass(priority: Ticket['priority']): string {
    return this.ticketService.getPriorityBadgeClass(priority);
  }

  updateTicketStatus(ticketId: string, newStatus: Ticket['status']): void {
    const currentUser = localStorage.getItem('email') || 'System';
    this.ticketService.updateTicketStatus(ticketId, newStatus, `Status changed to ${newStatus}`, currentUser).subscribe({
      next: (updatedTicket) => {
        // Mettre à jour le ticket dans la liste
        const index = this.tickets.findIndex(t => t._id === ticketId);
        if (index !== -1) {
          this.tickets[index] = updatedTicket;
          this.applyFilters();
        }
        this.loadTicketStats(); // Recharger les stats
      },
      error: (err) => console.error('Erreur mise à jour statut', err)
    });
  }

  onStatusChange(ticketId: string, event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newStatus = target.value as Ticket['status'];
    this.updateTicketStatus(ticketId, newStatus);
  }
}
