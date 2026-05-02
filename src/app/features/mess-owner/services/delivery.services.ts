import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService{

    private apiurl = `${environment.apiUrl}/Delivery`;

  constructor(private http : HttpClient) { }

  
  assignDelivery(orderId :number,staffId : number){
    return this.http.post(`${this.apiurl}/${orderId}/assign`,{staffId : staffId},{
      withCredentials : true
    })
  }
}