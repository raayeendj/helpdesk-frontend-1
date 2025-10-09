// agent.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-agents',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './agents.html',
  styleUrls: ['./agents.scss']
})
export class AgentsComponent implements OnInit {

  viewMode: 'agents' | 'teams' = 'agents'; // Mode actuel

  agents: any[] = [
    { id: 1, name: 'Rayen Temimi', role: 'Agent Principal', status: 'Actif' },
    { id: 2, name: 'Sana Ben Youssef', role: 'Agent Junior', status: 'En congé' },
    { id: 3, name: 'Ahmed Kacem', role: 'Agent Support', status: 'Actif' },
  ];

  teams: any[] = [
    { id: 1, name: 'Support Heroes', members: 5, description: 'Équipe de support technique' },
    { id: 2, name: 'Sales Force', members: 3, description: 'Équipe commerciale' },
  ];

  selectedItem: any = null; // Peut être un agent ou une équipe

  constructor() {}

  ngOnInit(): void {}

  // ======= Ajout d'un agent ou d'une équipe =======
  addAgent() {
    console.log('Add agent clicked');
    // Ici tu peux ouvrir un modal ou naviguer vers un formulaire
  }

  addTeam() {
    console.log('Add team clicked');
    // Ici tu peux ouvrir un modal ou naviguer vers un formulaire
  }

  // ======= Afficher les détails =======
  viewDetails(item: any) {
    this.selectedItem = item;
  }

  // ======= Bouton "Invite" dans le panneau détails =======
  invite() {
    console.log('Invite clicked for', this.viewMode);
    // Ici tu peux ouvrir un modal ou formulaire d’invitation
  }

  // ======= Bouton Edit =======
  editItem() {
    if (this.selectedItem) {
      console.log('Edit:', this.selectedItem);
      // Ouvre un modal ou navigue vers un formulaire d'édition
    }
  }

  // ======= Changer la vue (agents/teams) =======
  switchView(mode: 'agents' | 'teams') {
    this.viewMode = mode;
    this.selectedItem = null; // Réinitialise le détail quand on change de vue
  }
}
