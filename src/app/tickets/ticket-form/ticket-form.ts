import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ticket-form.html',
  styleUrls: ['./ticket-form.scss']
})
export class TicketFormComponent {
  ticket = {
    requesterName: '',
    requesterEmail: '',
    subject: '',
    message: '',
    status: 'Open',
    priority: 'Normal',
    assignee: '',
    team: '',
    tags: ''
  };

  teamList: string[] = ['Support Technique', 'Maintenance', 'IT', 'Service Client'];

  teamAgents: { [key: string]: string[] } = {
    'Support Technique': ['Amine', 'Yasmine'],
    'Maintenance': ['Sofiane', 'Amina'],
    'IT': ['Rami', 'Lina'],
    'Service Client': ['Sarah', 'Nabil']
  };

  filteredAgents: string[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  onTeamChange() {
    this.filteredAgents = this.teamAgents[this.ticket.team] || [];
    this.ticket.assignee = '';
  
  }

  submitForm() {
    this.http.post('http://localhost:5000/api/tickets', this.ticket).subscribe({
      next: res => {
        alert('Ticket envoyé !');
        this.router.navigate(['/']);
      },
      error: err => {
        alert('Erreur lors de l’envoi');
      }
    });
  }
}
