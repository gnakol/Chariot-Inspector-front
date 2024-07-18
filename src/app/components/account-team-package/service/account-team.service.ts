import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountTeamDTO } from '../bean/account-team'; // Assurez-vous que AccountTeam est correctement défini dans bean/account-team.ts

@Injectable({
  providedIn: 'root'
})
export class AccountTeamService {
  private baseUrl = 'http://localhost:9001/chariot-inspector/account-team';

  constructor(private http: HttpClient) { }

  getAccountTeamById(idAccountTeam: number): Observable<AccountTeamDTO> {
    return this.http.get<AccountTeamDTO>(`${this.baseUrl}/get-account-team-by-id/${idAccountTeam}`);
  }

  getAllAccountTeams(): Observable<AccountTeamDTO[]> {
    return this.http.get<AccountTeamDTO[]>(`${this.baseUrl}/all-account-team`);
  }

  addNewAccountTeam(accountTeam: AccountTeamDTO): Observable<AccountTeamDTO> {
    
    const headers = this.getHeaders();

    return this.http.post<AccountTeamDTO>(`${this.baseUrl}/add-new-account-team`, accountTeam, {headers});
  }

  getAccountTeamByWorkSessionId(workSessionId: string): Observable<AccountTeamDTO> {
    const headers = this.getHeaders();
    const params = { workSessionId }; // Ajout du paramètre de requête

    return this.http.get<AccountTeamDTO>(`${this.baseUrl}/get-account-team-by-work-session-id`, { headers, params });
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      throw new Error('No token found');
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
}
