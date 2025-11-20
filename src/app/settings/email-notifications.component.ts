import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-email-notifications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './email-notifications.component.html',
  styleUrls: ['./email-notifications.component.scss']
})
export class EmailNotificationsComponent {
  // local state for toggles
  newMessages = false;
  teamAssigned = false;
  newTicketConfirmation = false;
  feedbackRequest = false;

  confirmationMessage = "Thank you for your email. We'll reply as soon as we can. Your case number is {{ticket.shortID}}.";
  feedbackMessage = "How was your support experience? We'll appreciate your honest feedback!";
}
