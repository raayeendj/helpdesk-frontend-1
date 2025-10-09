import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,                // ✅ ajoute cette ligne
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class SidebarComponent {
  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
