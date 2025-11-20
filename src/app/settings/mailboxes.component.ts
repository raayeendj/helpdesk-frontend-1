import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mailboxes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mailboxes.component.html',
  styleUrls: ['./mailboxes.component.scss']
})
export class MailboxesComponent {}
