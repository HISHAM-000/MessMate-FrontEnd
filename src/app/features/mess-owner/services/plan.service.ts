import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private apiUrl = `${environment.apiUrl}/Subscription`;

  constructor(private http: HttpClient) {}

  getPlans() {
    return this.http.get(`${this.apiUrl}/my-plans`, {
      withCredentials: true   
    });
  }

  // getPlanById(id: number) {
  //   return this.http.get(`${this.apiUrl}/plans/${id}`, {
  //     withCredentials: true
  //   });
  // }
  getPlanById(id: number) {
  return this.http.get(`${this.apiUrl}/get-plansById/${id}`, {
    withCredentials: true
  });
}
  

  createPlan(data: any) {
    return this.http.post(`${this.apiUrl}/plans`, data, {
      withCredentials: true
    });
  }

  updatePlan(id: number, data: any) {
  return this.http.put(
    `${this.apiUrl}/update-plan/${id}`,
    data, 
    { withCredentials: true }
  );
}

  deletePlan(id: number) {
    return this.http.delete(`${this.apiUrl}/plans/${id}`, {
      withCredentials: true
    });
  }
}
