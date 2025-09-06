import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Agent } from '../models/agent';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AgentService {
  private base = `${environment.apiUrl}/agents`;

  constructor(private http: HttpClient) {}

  getAgents(teamId?: string): Observable<Agent[]> {
    let params = new HttpParams();
    if (teamId) params = params.set('teamId', teamId);
    return this.http.get<Agent[]>(this.base, { params });
  }

  createAgent(payload: { name: string; email: string; role?: string; teamId: string }): Observable<Agent> {
    return this.http.post<Agent>(this.base, payload);
  }

  updateAgent(id: string, payload: Partial<Agent>): Observable<Agent> {
    return this.http.put<Agent>(`${this.base}/${id}`, payload);
  }

  deleteAgent(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.base}/${id}`);
  }
}
