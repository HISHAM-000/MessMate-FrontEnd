import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApplicationService{
    private baseUrl = `${environment.apiUrl}/Application`;

    constructor(private http: HttpClient) {}

    getPendingMesses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/pending-messes`, {
      withCredentials: true
    });
  }

  approveMess(messId: number): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/approve-mess/${messId}`,
      {},
      { withCredentials: true }
    );
  }

  rejectMess(messId: number): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/reject-Mess/${messId}`,
      {},
      { withCredentials: true }
    );
  }

  rejectOwner(userId: number, reason: string) {
  return this.http.post(
    `${this.baseUrl}/reject-owner/${userId}`,
    { reason: reason },
    { withCredentials: true }
  );
}
}