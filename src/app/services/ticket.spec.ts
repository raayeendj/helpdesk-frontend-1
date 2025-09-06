import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TicketService } from './ticket.service';
import { Ticket } from '../tickets/models/ticket.model';

describe('TicketService', () => {
  let service: TicketService;
  let httpMock: HttpTestingController;

  const mockTicket: Ticket = {
    _id: '1',
    subject: 'Problème technique sur Pajero',
    requesterEmail: 'client@mitsubishi.tn',
    requesterName: 'JD',
    assignee: 'Mohamed',
    status: 'Open',
    message: 'En attente de diagnostic'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TicketService]
    });

    service = TestBed.inject(TicketService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all tickets', () => {
    service.getTickets().subscribe((tickets) => {
      expect(tickets.length).toBe(1);
      expect(tickets[0].subject).toEqual('Problème technique sur Pajero');
    });

    const req = httpMock.expectOne('http://localhost:5000/api/tickets');
    expect(req.request.method).toBe('GET');
    req.flush([mockTicket]);
  });

  it('should create a ticket', () => {
    service.createTicket(mockTicket).subscribe((res) => {
      expect(res).toEqual(mockTicket);
    });

    const req = httpMock.expectOne('http://localhost:5000/api/tickets');
    expect(req.request.method).toBe('POST');
    req.flush(mockTicket);
  });
});
