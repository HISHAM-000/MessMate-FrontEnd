import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Plan, Meal } from '../../shared/models/menu.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private baseUrl = `${environment.apiUrl}/Subscription`;
     
  constructor(private http: HttpClient) { }

  
  getPlansByMessId(messId: number) {
  return this.http.get(`${this.baseUrl}/plans/${messId}`, {
    withCredentials: true
  });
}

  getPlanById(id: number) {
  return this.http.get(`${this.baseUrl}/get-plansById/${id}`, {
    withCredentials: true
  });
}

  enroll(data: any) {
    return this.http.post(`${this.baseUrl}/enroll`, data, {
      withCredentials: true
    });
  }
}
