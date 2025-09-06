// src/app/ticket-detail/ticket-detail.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TicketDetailComponent } from './ticket-detail';
import { TicketService } from '../services/ticket.service';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('TicketDetailComponent', () => {
  let component: TicketDetailComponent;
  let fixture: ComponentFixture<TicketDetailComponent>;

  const mockTicket = {
    _id: '1',
    subject: 'Problème technique sur Pajero',
    requesterName: 'Client Test',
    requesterEmail: 'client@test.tn',
    team: 'Maintenance',
    assignee: 'Mohamed',
    status: 'Open',
    priority: 'Normal',
    message: 'Bruit anormal au démarrage',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const mockTicketService = {
    getTicketById: jasmine.createSpy('getTicketById').and.returnValue(of(mockTicket)),
    getTickets: jasmine.createSpy('getTickets').and.returnValue(of([mockTicket]))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketDetailComponent, RouterTestingModule],
      providers: [
        { provide: TicketService, useValue: mockTicketService },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TicketDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // ngOnInit()
  });

  it('should create', async () => {
    await fixture.whenStable();
    expect(component).toBeTruthy();
  });

  it('should load ticket by id on init', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    expect(mockTicketService.getTicketById).toHaveBeenCalledWith('1');

    // ✅ d’abord on s’assure que ticket est défini
    expect(component.ticket).toBeTruthy();

    // ✅ puis on asserte le sujet (avec non-null assertion)
    expect(component.ticket!.subject).toBe(mockTicket.subject);
    // (alternative sans non-null)
    // expect((component.ticket as any).subject).toBe(mockTicket.subject);
  });

  it('should render subject in the template', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const subjectEl = compiled.querySelector('h2.subject');
    expect(subjectEl?.textContent).toContain(mockTicket.subject);
  });
});
