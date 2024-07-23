import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeamDTO } from '../bean/team'; // Assurez-vous que Team est correctement défini dans bean/team.ts
import { TeamResponse } from '../bean/page';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private baseUrl = 'http://localhost:9001/chariot-inspector/team';

  constructor(private http: HttpClient) { }

  getTeamById(idTeam: number): Observable<TeamDTO> {
    const headers = this.getHeaders();
    return this.http.get<TeamDTO>(`${this.baseUrl}/get-team-by-id/${idTeam}`, { headers });
  }

  allTeam(page: number, size: number): Observable<TeamResponse> {
    
    const headers = this.getHeaders();

    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<TeamResponse>(`${this.baseUrl}/all-team`, { headers, params });
  }

  addNewTeam(team: TeamDTO): Observable<TeamDTO> {
    return this.http.post<TeamDTO>(`${this.baseUrl}/add-new-team`, team);
  }

  getIdTeamByName(name : string) : Observable<any>
  {
    const headers = this.getHeaders();

    return this.http.get<any>(`${this.baseUrl}/get-id-team-by-name?name=${name}`, {headers});
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
