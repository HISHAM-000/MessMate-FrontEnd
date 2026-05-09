import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private baseUrl = `${environment.apiUrl}/MessStaff`;

  constructor(private http: HttpClient) {}

  // 🔥 Get staff by mess
  getStaffByMess(messId: number) {
  return this.http.get(`${this.baseUrl}/get-staff`, {
    params: { messId: messId },
    withCredentials: true
  });
}

}