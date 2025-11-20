import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
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

  // 🔹 Liste des équipes
  teamList: string[] = ['Support Technique', 'Maintenance', 'IT', 'Service Client'];

  // 🔹 Agents par équipe
  teamAgents: { [key: string]: string[] } = {
    'Support Technique': ['Amine', 'Yasmine'],
    'Maintenance': ['Sofiane', 'Amina'],
    'IT': ['Rami', 'Lina'],
    'Service Client': ['Sarah', 'Nabil']
  };

  filteredAgents: string[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  // 🔸 Mise à jour des agents selon l’équipe choisie
  onTeamChange(): void {
    this.filteredAgents = this.teamAgents[this.ticket.team] || [];
    this.ticket.assignee = '';
  }

  // 🔸 Soumission du formulaire
  submitForm(): void {
    if (
      !this.ticket.requesterName ||
      !this.ticket.requesterEmail ||
      !this.ticket.subject ||
      !this.ticket.message ||
      !this.ticket.team ||
      !this.ticket.assignee
    ) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    this.http.post('http://localhost:5000/api/tickets', this.ticket).subscribe({
      next: () => {
        alert('✅ Ticket envoyé avec succès !');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Erreur lors de l’envoi du ticket :', err);
        alert('❌ Erreur lors de l’envoi du ticket.');
      }
    });
  }
}
