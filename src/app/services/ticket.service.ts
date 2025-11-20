import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ticket {
  _id: string;
  requesterName: string;
  requesterEmail: string;
  subject: string;
  message: string;
  status: 'Open' | 'Pending' | 'On Hold' | 'In Progress' | 'Closed';
  priority: 'Low' | 'Normal' | 'High' | 'Critical';
  assignee: string;
  team: string;
  tags: string;
  statusHistory: Array<{
    status: string;
    changedBy: string;
    changedAt: string;
    comment: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface TicketStats {
  total: number;
  open: number;
  pending: number;
  onHold: number;
  inProgress: number;
  closed: number;
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://localhost:5000/api/tickets';

  constructor(private http: HttpClient) {}

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrl);
  }

  getTicketById(id: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/${id}`);
  }

  createTicket(ticket: Partial<Ticket>): Observable<Ticket> {
    return this.http.post<Ticket>(this.apiUrl, ticket);
  }

  updateTicket(id: string, ticket: Partial<Ticket>): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.apiUrl}/${id}`, ticket);
  }

  deleteTicket(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Nouvelles méthodes pour la gestion des statuts
  updateTicketStatus(id: string, status: Ticket['status'], comment?: string, changedBy?: string): Observable<Ticket> {
    return this.http.patch<Ticket>(`${this.apiUrl}/${id}/status`, {
      status,
      comment,
      changedBy
    });
  }

  getTicketsByStatus(status: Ticket['status']): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/status/${status}`);
  }

  getTicketStats(): Observable<TicketStats> {
    return this.http.get<TicketStats>(`${this.apiUrl}/stats/summary`);
  }

  getStatusBadgeClass(status: Ticket['status']): string {
    switch (status) {
      case 'Open': return 'badge-open';
      case 'Pending': return 'badge-pending';
      case 'On Hold': return 'badge-onhold';
      case 'In Progress': return 'badge-progress';
      case 'Closed': return 'badge-closed';
      default: return 'badge-default';
    }
  }

  getPriorityBadgeClass(priority: Ticket['priority']): string {
    switch (priority) {
      case 'Low': return 'badge-low';
      case 'Normal': return 'badge-normal';
      case 'High': return 'badge-high';
      case 'Critical': return 'badge-critical';
      default: return 'badge-default';
    }
  }
}
