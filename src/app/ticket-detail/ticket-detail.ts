// src/app/ticket-detail/ticket-detail.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TicketService } from '../services/ticket.service';

type TicketVM = {
  requesterName: string;
  requesterEmail: string;
  subject: string;
  assignee?: string;
  status: string;
  id?: string | number;
  message: string;
  team?: string;
  priority?: string;
  tags?: string[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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
  // search and selection
  searchQuery: string = '';
  filteredTickets: TicketVM[] = [];
  selectedTicketIds: Set<string | number> = new Set();
  tagToAdd: string = '';
  statusCounts = { open: 0, pending: 0, onHold: 0, solved: 0, closed: 0, spam: 0 };
  // UI state for which status/group is active (for highlighting)
  activeStatus: string | null = null;
  activeGroup: string | null = null;

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
          updatedAt: t.updatedAt,
          id: t._id ?? t.id ?? '',
        }));

        // For demo purposes: mark some tickets client-side as On Hold / Pending
        if (normalized.length > 0) {
          // only change them if they don't already have those statuses
          if (!/on hold|onhold|on_hold/i.test(normalized[0].status)) normalized[0].status = 'On Hold';
        }
        if (normalized.length > 1) {
          if (!/pending/i.test(normalized[1].status)) normalized[1].status = 'Pending';
        }

        this.tickets = normalized;
        // initialize filtered view to show all tickets
        this.filteredTickets = this.tickets.slice();

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

  // (filterByStatus/filterByGroup implemented below using updateFilteredTickets)

  private updateFilteredTickets() {
    const norm = (s: any) => (s || '').toString().toLowerCase();
    let list = this.tickets.slice();
    // apply group filter
    if (this.activeGroup) {
      switch (this.activeGroup) {
        case 'toHandle':
          list = list.filter(x => ['open', 'pending', 'on hold', 'on_hold', 'onhold'].includes(norm(x.status)));
          break;
        case 'myOpen':
          list = list.filter(x => norm(x.status) === 'open');
          break;
        case 'last7':
          list = list.filter(x => {
            const dRaw = x.updatedAt ?? x.createdAt;
            if (!dRaw) return false;
            const time = dRaw instanceof Date ? dRaw.getTime() : new Date(dRaw).getTime();
            if (isNaN(time)) return false;
            return (Date.now() - time) <= 7 * 24 * 60 * 60 * 1000;
          });
          break;
        case 'open':
          list = list.filter(x => norm(x.status) === 'open');
          break;
      }
    }
    // apply status filter
    if (this.activeStatus) {
      const target = this.activeStatus.toLowerCase();
      list = list.filter(t => {
        const s = norm(t.status);
        if (target === 'on hold') return s === 'on hold' || s === 'onhold' || s === 'on_hold';
        return s === target;
      });
    }
    // apply search
    if (this.searchQuery && this.searchQuery.trim()) {
      const q = this.searchQuery.trim().toLowerCase();
      list = list.filter(t => {
        return (
          (t.subject || '').toLowerCase().includes(q) ||
          (t.requesterName || '').toLowerCase().includes(q) ||
          (t.requesterEmail || '').toLowerCase().includes(q) ||
          (t.assignee || '').toLowerCase().includes(q) ||
          (t.message || '').toLowerCase().includes(q)
        );
      });
    }
    this.filteredTickets = list;
  }

  // Selection helpers
  toggleSelect(id?: string | number) {
    if (id === undefined || id === null) return;
    if (this.selectedTicketIds.has(id)) this.selectedTicketIds.delete(id);
    else this.selectedTicketIds.add(id);
  }

  isSelected(id?: string | number) {
    if (id === undefined || id === null) return false;
    return this.selectedTicketIds.has(id);
  }

  selectAllVisible(checked: boolean) {
    if (checked) {
      for (const t of this.filteredTickets) this.selectedTicketIds.add(t.id ?? '');
    } else {
      for (const t of this.filteredTickets) this.selectedTicketIds.delete(t.id ?? '');
    }
  }

  // Filter setters: use updateFilteredTickets so search also applies
  filterByStatus(status: string): void {
    if (this.activeStatus === status) {
      this.activeStatus = null;
      this.activeGroup = null;
    } else {
      this.activeStatus = status;
      this.activeGroup = null;
    }
    this.updateFilteredTickets();
  }

  filterByGroup(group: string): void {
    if (this.activeGroup === group) {
      this.activeGroup = null;
      this.activeStatus = null;
    } else {
      this.activeGroup = group;
      this.activeStatus = null;
    }
    this.updateFilteredTickets();
  }

  // Batch actions
  applyStatusToSelected(status: string) {
    if (!status) return;
    for (const t of this.tickets) {
      if (this.selectedTicketIds.has(t.id ?? '')) t.status = status;
    }
    this.updateCounts();
    this.updateFilteredTickets();
    this.selectedTicketIds.clear();
  }

  applyPriorityToSelected(priority: string) {
    if (!priority) return;
    for (const t of this.tickets) {
      if (this.selectedTicketIds.has(t.id ?? '')) t.priority = priority;
    }
    this.updateFilteredTickets();
    this.selectedTicketIds.clear();
  }

  assignTeamToSelected(teamName: string) {
    if (!teamName) return;
    for (const t of this.tickets) {
      if (this.selectedTicketIds.has(t.id ?? '')) t.team = teamName;
    }
    this.updateFilteredTickets();
    this.selectedTicketIds.clear();
  }

  assignAgentToSelected(agentName: string) {
    if (!agentName) return;
    for (const t of this.tickets) {
      if (this.selectedTicketIds.has(t.id ?? '')) t.assignee = agentName;
    }
    this.updateFilteredTickets();
    this.selectedTicketIds.clear();
  }

  addTagToSelected(tag: string) {
    if (!tag) return;
    for (const t of this.tickets) {
      if (this.selectedTicketIds.has(t.id ?? '')) {
        if (!t['tags']) t['tags'] = [];
        if (Array.isArray(t['tags'])) t['tags'].push(tag);
      }
    }
    this.tagToAdd = '';
    this.updateFilteredTickets();
    this.selectedTicketIds.clear();
  }

  deleteSelected() {
    if (this.selectedTicketIds.size === 0) return;
    this.tickets = this.tickets.filter(t => !this.selectedTicketIds.has(t.id ?? ''));
    this.selectedTicketIds.clear();
    this.updateCounts();
    this.updateFilteredTickets();
  }

  private updateCounts() {
    const norm = (s: any) => (s || '').toString().toLowerCase();
    const counts = { open: 0, pending: 0, onHold: 0, solved: 0, closed: 0, spam: 0 };
    for (const x of this.tickets) {
      const s = norm(x.status);
      if (s === 'open') counts.open++;
      else if (s === 'pending') counts.pending++;
      else if (s === 'on hold' || s === 'onhold' || s === 'on_hold') counts.onHold++;
      else if (s === 'solved') counts.solved++;
      else if (s === 'closed') counts.closed++;
      else if (s === 'spam') counts.spam++;
    }
    this.statusCounts = counts;
  }
}
