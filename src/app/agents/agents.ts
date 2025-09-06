import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Agent {
  _id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Technician' | 'Agent' | string;
  teams?: string[];
}

interface Team {
  _id: string;
  name: string;
  members: string[];
}

@Component({
  selector: 'app-agents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agents.html',
  styleUrls: ['./agents.scss']
})
export class AgentsComponent {
  // Onglet actif par défaut
  activeTab: 'agents' | 'teams' = 'agents';

  // Liste d'agents
  agents: Agent[] = [
    { _id: '1', name: 'Jean Dupont', email: 'jean.dupont@example.com', role: 'Admin', teams: ['Support', 'Sales'] },
    { _id: '2', name: 'Claire Martin', email: 'claire.martin@example.com', role: 'Technician', teams: ['Support'] },
    { _id: '3', name: 'Ali Ben Salah', email: 'ali.bensalah@example.com', role: 'Agent', teams: ['Maintenance'] }
  ];

  // Liste de teams
  teams: Team[] = [
    { _id: 't1', name: 'Support Heroes', members: ['Jean Dupont', 'Claire Martin'] },
    { _id: 't2', name: 'Maintenance Crew', members: ['Ali Ben Salah'] }
  ];

  // Sélection
  selectedAgent: Agent | null = null;
  selectedTeam: Team | null = null;

  // Changer d'onglet
  switchTab(tab: 'agents' | 'teams') {
    this.activeTab = tab;
    this.selectedAgent = null;
    this.selectedTeam = null;
  }

  // Sélection agent
  selectAgent(agent: Agent) {
    this.selectedAgent = agent;
    this.selectedTeam = null;
  }

  // Sélection team
  selectTeam(team: Team) {
    this.selectedTeam = team;
    this.selectedAgent = null;
  }

  // Ajouter (agent ou team selon onglet actif)
  addItem() {
    if (this.activeTab === 'agents') {
      alert('Ajouter agent — implémenter formulaire/modal');
    } else {
      alert('Ajouter team — implémenter formulaire/modal');
    }
  }

  // Editer
  editAgent() {
    if (!this.selectedAgent) return;
    alert(`Editer ${this.selectedAgent.name}`);
  }

  editTeam() {
    if (!this.selectedTeam) return;
    alert(`Editer ${this.selectedTeam.name}`);
  }
}
