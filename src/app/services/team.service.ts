import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from '../models/agent';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TeamService {
  private base = `${environment.apiUrl}/teams`;

  constructor(private http: HttpClient) {}

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.base);
  }

  getTeamsWithAgents(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.base}/with-agents`);
  }

  createTeam(payload: { name: string; description?: string }): Observable<Team> {
    return this.http.post<Team>(this.base, payload);
  }
}
