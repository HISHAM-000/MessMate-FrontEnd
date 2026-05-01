import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private apiUrl = `${environment.apiUrl}/Delivery`;

  constructor(private http: HttpClient) {}

  confirmDelivery(orderId: number, otp: string) {

  const payload = { otp: otp };

  return this.http.post(
    `${this.apiUrl}/${orderId}/confirm`,
    payload,
    { withCredentials: true }
  );
}

  getHistory() {
    return this.http.get(`${this.apiUrl}/my-history`, {
      withCredentials: true
    });
  }
}