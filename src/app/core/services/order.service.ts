import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public baseUrl = `${environment.apiUrl}/Order`;
  constructor(private http : HttpClient) { }

  getMyOrders(){
    return this.http.get(`${this.baseUrl}/my-orders`);
  }

}
