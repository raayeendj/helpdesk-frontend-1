// src/app/tickets/models/ticket.model.ts
export interface Ticket {
  _id: string;
  subject: string;
  requesterEmail: string;
  requesterName: string;
  assignee: string;
  status: string;
  message: string;
}
