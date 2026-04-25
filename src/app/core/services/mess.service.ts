import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessService {

  private baseUrl = `${environment.apiUrl}/Mess`;

  constructor(private http: HttpClient) {}

  getMyMess() {
    return this.http.get(`${this.baseUrl}/GetMyMess`);
  }
}
