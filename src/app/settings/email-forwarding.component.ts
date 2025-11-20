import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface EmailForwardingRule {
  id: string;
  fromEmail: string;
  toEmail: string;
  enabled: boolean;
}

@Component({
  selector: 'app-email-forwarding',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './email-forwarding.component.html',
  styleUrls: ['./email-forwarding.component.scss']
})
export class EmailForwardingComponent implements OnInit {
  forwardingRules: EmailForwardingRule[] = [];
  isAddingRule = false;
  
  newRule: EmailForwardingRule = {
    id: '',
    fromEmail: '',
    toEmail: '',
    enabled: true
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadForwardingRules();
  }

  loadForwardingRules() {
    // TODO: Replace with actual API call
    // this.http.get<EmailForwardingRule[]>('http://localhost:3000/api/settings/email-forwarding')
    //   .subscribe(rules => this.forwardingRules = rules);
    
    // Mock data
    this.forwardingRules = [
      {
        id: '1',
        fromEmail: 'support@company.com',
        toEmail: 'team@company.com',
        enabled: true
      },
      {
        id: '2',
        fromEmail: 'info@company.com',
        toEmail: 'admin@company.com',
        enabled: false
      }
    ];
  }

  showAddForm() {
    this.isAddingRule = true;
    this.newRule = {
      id: '',
      fromEmail: '',
      toEmail: '',
      enabled: true
    };
  }

  cancelAddRule() {
    this.isAddingRule = false;
    this.newRule = {
      id: '',
      fromEmail: '',
      toEmail: '',
      enabled: true
    };
  }

  addRule() {
    if (!this.newRule.fromEmail || !this.newRule.toEmail) {
      return;
    }

    // TODO: Replace with actual API call
    // this.http.post('http://localhost:3000/api/settings/email-forwarding', this.newRule)
    //   .subscribe(rule => {
    //     this.forwardingRules.push(rule);
    //     this.cancelAddRule();
    //   });

    // Mock add
    this.newRule.id = Date.now().toString();
    this.forwardingRules.push({ ...this.newRule });
    this.cancelAddRule();
  }

  toggleRule(rule: EmailForwardingRule) {
    rule.enabled = !rule.enabled;
    
    // TODO: Replace with actual API call
    // this.http.put(`http://localhost:3000/api/settings/email-forwarding/${rule.id}`, rule)
    //   .subscribe();
  }

  deleteRule(ruleId: string) {
    if (!confirm('Are you sure you want to delete this forwarding rule?')) {
      return;
    }

    // TODO: Replace with actual API call
    // this.http.delete(`http://localhost:3000/api/settings/email-forwarding/${ruleId}`)
    //   .subscribe(() => {
    //     this.forwardingRules = this.forwardingRules.filter(r => r.id !== ruleId);
    //   });

    // Mock delete
    this.forwardingRules = this.forwardingRules.filter(r => r.id !== ruleId);
  }
}
