// src/app/ticket-detail/ticket-detail.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketService } from '../services/ticket.service';

type TicketVM = {
  requesterName: string;
  requesterEmail: string;
  subject: string;
  assignee?: string;
  status: string;
  message: string;
  team?: string;
  priority?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ticket-detail.html',   // assure-toi que le fichier existe
  styleUrls: ['./ticket-detail.scss']    // et celui-ci aussi
})
export class TicketDetailComponent implements OnInit {
  // Liste pour la partie droite (cartes)
  tickets: TicketVM[] = [];

  // Données pour la sidebar
  ticketsToHandle: TicketVM[] = [];
  myOpenTickets: TicketVM[] = [];
  last7DaysTickets: TicketVM[] = [];
  openTickets: TicketVM[] = [];
  statusCounts = { open: 0, pending: 0, onHold: 0, solved: 0, closed: 0, spam: 0 };

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.loadAllTickets();
  }

  private loadAllTickets(): void {
    this.ticketService.getTickets().subscribe({
      next: (raw: any) => {
        const list: any[] = Array.isArray(raw) ? raw : [];

        // Normalisation des champs pour éviter les undefined
        const normalized: TicketVM[] = list.map((t: any) => ({
          requesterName: t.requesterName ?? t.requester ?? '',
          requesterEmail: t.requesterEmail ?? t.email ?? '',
          subject: t.subject ?? '',
          assignee: t.assignee ?? t.agent ?? 'Unassigned',
          status: t.status ?? 'Open',
          message: t.message ?? t.lastMessage ?? '',
          team: t.team ?? '',
          priority: t.priority ?? 'Normal',
          createdAt: t.createdAt,
          updatedAt: t.updatedAt
        }));

        this.tickets = normalized;

        // --- Alimentation de la sidebar ---
        const norm = (s: any) => (s || '').toString().toLowerCase();

        this.ticketsToHandle = normalized.filter(x =>
          ['open', 'pending', 'on hold', 'on_hold', 'onhold'].includes(norm(x.status))
        );

        this.myOpenTickets = normalized.filter(x => norm(x.status) === 'open');

        const now = Date.now();
        this.last7DaysTickets = normalized.filter(x => {
          const dRaw = x.updatedAt ?? x.createdAt;
          if (!dRaw) return false;
          const time = dRaw instanceof Date ? dRaw.getTime() : new Date(dRaw).getTime();
          if (isNaN(time)) return false;
          return (now - time) <= 7 * 24 * 60 * 60 * 1000;
        });

        this.openTickets = normalized.filter(x => norm(x.status) === 'open');

        const counts = { open: 0, pending: 0, onHold: 0, solved: 0, closed: 0, spam: 0 };
        for (const x of normalized) {
          const s = norm(x.status);
          if (s === 'open') counts.open++;
          else if (s === 'pending') counts.pending++;
          else if (s === 'on hold' || s === 'on_hold' || s === 'onhold') counts.onHold++;
          else if (s === 'solved') counts.solved++;
          else if (s === 'closed') counts.closed++;
          else if (s === 'spam') counts.spam++;
        }
        this.statusCounts = counts;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des tickets :', err);
      }
    });
  }
}
