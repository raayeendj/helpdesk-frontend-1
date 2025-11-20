import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-company-name',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './company-name.component.html',
  styleUrls: ['./company-name.component.scss']
})
export class CompanyNameComponent implements OnInit {
  companyName: string = '';
  isSaving: boolean = false;
  saveSuccess: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCompanyName();
  }

  loadCompanyName() {
    // TODO: Replace with actual API call
    // this.http.get<{ companyName: string }>('http://localhost:3000/api/settings/company-name')
    //   .subscribe(data => this.companyName = data.companyName);
    
    // Mock data
    this.companyName = 'My Company Inc.';
  }

  saveCompanyName() {
    this.isSaving = true;
    this.saveSuccess = false;

    // TODO: Replace with actual API call
    // this.http.put('http://localhost:3000/api/settings/company-name', { companyName: this.companyName })
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
