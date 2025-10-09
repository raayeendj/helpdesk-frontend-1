import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar';
import { NavbarComponent } from './navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,                       
  imports: [RouterOutlet, NgIf, SidebarComponent, NavbarComponent], 
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  currentUrl = '';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
      }
    });
  }

  showSidebar(): boolean {
    const hiddenRoutes = ['/login', '/signup'];
    return !hiddenRoutes.includes(this.currentUrl);
  }
}
