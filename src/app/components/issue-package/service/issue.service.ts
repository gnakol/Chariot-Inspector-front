import { Injectable } from '@angular/core';
import { AuthService } from '../../../authenticate/core/auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Issue } from '../bean/issue';
import { Observable } from 'rxjs';
import { IssueResponse } from '../bean/page';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private baseUrlIssue = 'http://localhost:9001/chariot-inspector/issue';

  constructor(private authService : AuthService, private http : HttpClient) { }

  public getIssueById(idIssue : number) : Observable<any>
  {
    const token = this.authService.getToken();

    if(!token)
      {
        throw new Error('Token was not found');
      }

      const headers = {Authorization : `Bearer ${token}`};

      return this.http.get<any>(`${this.baseUrlIssue}/get-issue-by-id/${idIssue}`, {headers});
  }

  public addNewIssue(issue : Issue) : Observable<Issue>
  {
    const token = this.authService.getToken();

    const workSessionId = localStorage.getItem('workSessionId');

    if(workSessionId)
    {
      issue.workSessionId = workSessionId;
    }

    if(!token)
      {
        throw new Error('No token found');
      }

      const headers = new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      });

      return this.http.post<Issue>(`${this.baseUrlIssue}/add-new-issue`, issue, {headers});
  }

  getIdIssueByWorkSessionId(workSessionId: string): Observable<number> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('Token was not found');
    }

    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<number>(`${this.baseUrlIssue}/get-id-issue-by-work-session-id/${workSessionId}`, { headers });
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

  getAllIssuesWithoutAction(teamId: number, startDate: string, endDate: string, page: number, size: number): Observable<IssueResponse> {
    const headers = this.getHeaders();
    let params = new HttpParams()
      .set('teamId', teamId)
      .set('startDate', startDate)
      .set('endDate', endDate)
      .set('page', page)
      .set('size', size);

    return this.http.get<IssueResponse>(`${this.baseUrlIssue}/all-issue-with-not-action-carried-out`, { headers, params });
  }
}
