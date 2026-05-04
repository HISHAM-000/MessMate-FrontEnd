import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from 'src/app/shared/models/register-request.model';
import { Observable } from 'rxjs';
import { RegisterOwnerRequest } from 'src/app/shared/models/register-owner-request';
import { LoginRequest } from 'src/app/shared/models/login-request';
import { LoginResponse } from 'src/app/shared/models/login-response';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7200/api/auth';

  constructor(private http: HttpClient) { }

  registerCustomer(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-customer`, data);
  }

   registerOwner(data: RegisterOwnerRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-mess-owner`, data);
  }

  login(data: LoginRequest): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data, {
    withCredentials: true
  });
}

logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, {
      withCredentials: true
    });
  }

handleLogout() {
    this.logout().subscribe({
      next: () => this.clearClientState(),
      error: () => this.clearClientState()
    });
  }

 clearClientState() {
    localStorage.clear();
    sessionStorage.clear();
  }

refreshToken(): Observable<any> {
    return this.http.post(`${this.apiUrl}/refresh`, {}, {
      withCredentials: true
    });
  }
}
