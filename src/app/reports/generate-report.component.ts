import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface ReportConfig {
  reportType: string;
  dateRange: {
    from: string;
    to: string;
  };
  filters: {
    status: string[];
    priority: string[];
    team: string[];
    assignee: string[];
  };
  format: string;
}

@Component({
  selector: 'app-generate-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.scss']
})
export class GenerateReportComponent implements OnInit {
  reportConfig: ReportConfig = {
    reportType: 'summary',
    dateRange: {
      from: '',
      to: ''
    },
    filters: {
      status: [],
      priority: [],
      team: [],
      assignee: []
    },
    format: 'pdf'
  };

  reportTypes = [
    { value: 'summary', label: 'Summary Report' },
    { value: 'detailed', label: 'Detailed Report' },
    { value: 'performance', label: 'Performance Report' },
    { value: 'satisfaction', label: 'Customer Satisfaction Report' },
    { value: 'agent', label: 'Agent Performance Report' }
  ];

  statusOptions = ['Open', 'Pending', 'In Progress', 'On Hold', 'Closed'];
  priorityOptions = ['Low', 'Medium', 'High', 'Urgent'];
  teamOptions: string[] = [];
  assigneeOptions: string[] = [];

  formatOptions = [
    { value: 'pdf', label: 'PDF' },
    { value: 'excel', label: 'Excel (XLSX)' },
    { value: 'csv', label: 'CSV' }
  ];

  isGenerating = false;
  generatedReportUrl: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.setDefaultDateRange();
    this.loadTeamsAndAgents();
  }

  setDefaultDateRange() {
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(today.getMonth() - 1);

    this.reportConfig.dateRange.to = this.formatDate(today);
    this.reportConfig.dateRange.from = this.formatDate(lastMonth);
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  loadTeamsAndAgents() {
    // TODO: Load from API
    this.teamOptions = ['Support Team', 'Technical Team', 'Sales Team'];
    this.assigneeOptions = ['John Doe', 'Jane Smith', 'Mike Johnson'];
  }

  toggleFilter(filterType: keyof ReportConfig['filters'], value: string) {
    const filterArray = this.reportConfig.filters[filterType];
    const index = filterArray.indexOf(value);
    
    if (index > -1) {
      filterArray.splice(index, 1);
    } else {
      filterArray.push(value);
    }
  }

  isFilterSelected(filterType: keyof ReportConfig['filters'], value: string): boolean {
    return this.reportConfig.filters[filterType].includes(value);
  }

  generateReport() {
    this.isGenerating = true;
    this.generatedReportUrl = null;

    // TODO: Replace with actual API call
    // this.http.post('http://localhost:3000/api/reports/generate', this.reportConfig)
    //   .subscribe({
    //     next: (response: any) => {
    //       this.generatedReportUrl = response.downloadUrl;
    //       this.isGenerating = false;
    //     },
    //     error: (error) => {
    //       console.error('Error generating report:', error);
    //       this.isGenerating = false;
    //     }
    //   });

    // Mock generation
    setTimeout(() => {
      this.generatedReportUrl = '#';
      this.isGenerating = false;
    }, 2000);
  }

  downloadReport() {
    if (this.generatedReportUrl) {
      window.open(this.generatedReportUrl, '_blank');
    }
  }

  resetForm() {
    this.reportConfig = {
      reportType: 'summary',
      dateRange: {
        from: '',
        to: ''
      },
      filters: {
        status: [],
        priority: [],
        team: [],
        assignee: []
      },
      format: 'pdf'
    };
    this.setDefaultDateRange();
    this.generatedReportUrl = null;
  }
}
