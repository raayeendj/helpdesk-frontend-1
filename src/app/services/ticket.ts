export interface Ticket {
  _id?: string;
  requesterEmail: string;
  requesterInitials?: string;
  subject: string;
  agent: string;
  status: string;
  lastMessage?: string;
}
