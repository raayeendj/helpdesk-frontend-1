import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgentService } from '../services/agent.service';
import { TeamService } from '../services/team.service';
import { Agent, Team } from '../models/agent';

@Component({
  selector: 'app-agent-management',
  standalone: true,
  templateUrl: './agent-management.html',
  styleUrls: ['./agent-management.scss'],
  imports: [CommonModule, FormsModule]
})
export class AgentManagementComponent implements OnInit {
  activeTab: 'agents' | 'teams' = 'agents';
  agents: Agent[] = [];
  teams: Team[] = [];
  selectedAgent: Agent | null = null;
  selectedTeam: Team | null = null;
  showAddDropdown = false;
  showInviteModal = false;
  showCreateTeamModal = false;
  loading = false;

  // Invite agent form
  inviteForm = {
    name: '',
    email: '',
    role: 'Agent' as 'Admin' | 'Technician' | 'Agent',
    teamId: ''
  };

  // Create team form
  teamForm = {
    name: '',
    description: ''
  };

  constructor(
    private agentService: AgentService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    Promise.all([
      this.agentService.getAgents().toPromise(),
      this.teamService.getTeamsWithAgents().toPromise()
    ]).then(([agents, teams]) => {
      this.agents = agents || [];
      this.teams = teams || [];
      this.loading = false;
    }).catch(error => {
      console.error('Error loading data:', error);
      this.loading = false;
    });
  }

  switchTab(tab: 'agents' | 'teams'): void {
    this.activeTab = tab;
    this.selectedAgent = null;
    this.selectedTeam = null;
    this.showAddDropdown = false;
  }

  selectAgent(agent: Agent): void {
    this.selectedAgent = agent;
    this.selectedTeam = null;
  }

  selectTeam(team: Team): void {
    this.selectedTeam = team;
    this.selectedAgent = null;
  }

  toggleAddDropdown(): void {
    this.showAddDropdown = !this.showAddDropdown;
  }

  openInviteModal(): void {
    this.showInviteModal = true;
    this.showAddDropdown = false;
  }

  openCreateTeamModal(): void {
    this.showCreateTeamModal = true;
    this.showAddDropdown = false;
  }

  closeModals(): void {
    this.showInviteModal = false;
    this.showCreateTeamModal = false;
    this.resetForms();
  }

  resetForms(): void {
    this.inviteForm = {
      name: '',
      email: '',
      role: 'Agent',
      teamId: ''
    };
    this.teamForm = {
      name: '',
      description: ''
    };
  }

  inviteAgent(): void {
    if (!this.inviteForm.name || !this.inviteForm.email || !this.inviteForm.teamId) {
      alert('Veuillez remplir tous les champs requis');
      return;
    }

    this.agentService.createAgent(this.inviteForm).subscribe({
      next: (agent) => {
        this.agents.push(agent);
        this.closeModals();
        alert('Agent invité avec succès');
      },
      error: (error) => {
        console.error('Error inviting agent:', error);
        alert('Erreur lors de l\'invitation de l\'agent');
      }
    });
  }

  createTeam(): void {
    if (!this.teamForm.name) {
      alert('Veuillez saisir le nom de l\'équipe');
      return;
    }

    this.teamService.createTeam(this.teamForm).subscribe({
      next: (team) => {
        this.teams.push(team);
        this.closeModals();
        alert('Équipe créée avec succès');
      },
      error: (error) => {
        console.error('Error creating team:', error);
        alert('Erreur lors de la création de l\'équipe');
      }
    });
  }

  getAgentInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  getTeamInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  getRoleBadgeClass(role: string): string {
    switch (role) {
      case 'Admin': return 'badge-admin';
      case 'Technician': return 'badge-technician';
      default: return 'badge-agent';
    }
  }

  getAgentTeams(agent: Agent | null): Team[] {
    if (!agent) return [];
    
    // If team is already a Team object, return it in an array
    if (typeof agent.team === 'object' && agent.team !== null) {
      return [agent.team];
    }
    
    // If team is a string (ID), find the team in the teams array
    if (typeof agent.team === 'string') {
      const team = this.teams.find(t => t._id === agent.team);
      return team ? [team] : [];
    }
    
    return [];
  }

  getTeamMembers(team: Team | null): Agent[] {
    if (!team) return [];
    
    // If team has members populated, return them
    if (team.agents && Array.isArray(team.agents)) {
      return team.agents;
    }
    
    // Otherwise, find agents that belong to this team
    return this.agents.filter(agent => {
      if (typeof agent.team === 'string') {
        return agent.team === team._id;
      } else if (typeof agent.team === 'object' && agent.team !== null) {
        return agent.team._id === team._id;
      }
      return false;
    });
  }
}
