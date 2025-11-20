import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Mailbox {
  id: string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-default-mailbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './default-mailbox.component.html',
  styleUrls: ['./default-mailbox.component.scss']
})
export class DefaultMailboxComponent implements OnInit {
  mailboxes: Mailbox[] = [];
  selectedMailboxId: string = '';
  isSaving: boolean = false;
  saveSuccess: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadMailboxes();
  }

  loadMailboxes() {
    // TODO: Replace with actual API call
    // this.http.get<{ mailboxes: Mailbox[], defaultMailboxId: string }>('http://localhost:3000/api/settings/mailboxes')
    //   .subscribe(data => {
    //     this.mailboxes = data.mailboxes;
    //     this.selectedMailboxId = data.defaultMailboxId;
    //   });
    
    // Mock data
    this.mailboxes = [
      { id: '1', name: 'Support Mailbox', email: 'support@company.com' },
      { id: '2', name: 'Sales Mailbox', email: 'sales@company.com' },
      { id: '3', name: 'Info Mailbox', email: 'info@company.com' }
    ];
    this.selectedMailboxId = '1';
  }

  saveDefaultMailbox() {
    this.isSaving = true;
    this.saveSuccess = false;

    // TODO: Replace with actual API call
    // this.http.put('http://localhost:3000/api/settings/default-mailbox', { mailboxId: this.selectedMailboxId })
    //   .subscribe(() => {
    //     this.isSaving = false;
    //     this.saveSuccess = true;
    //     setTimeout(() => this.saveSuccess = false, 3000);
    //   });

    // Mock save
    setTimeout(() => {
      this.isSaving = false;
      this.saveSuccess = true;
      setTimeout(() => this.saveSuccess = false, 3000);
    }, 1000);
  }
}
