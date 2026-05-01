import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private apiUrl = `${environment.apiUrl}/MessStaff`

  constructor(private http : HttpClient) { }

  getStaff(){
    return this.http.get(`${this.apiUrl}/get-staff`,{
      withCredentials : true
    })
  }

  assignDelivery(orderId :number){
    return this.http.post(`${this.apiUrl}/${orderId}/assign`,{},{
      withCredentials : true
    })
  }

  deleteStaff(staffId : number){
    return this.http.delete(`${this.apiUrl}/delete-staff/${staffId}`,{
      withCredentials : true
    })
  }

  addStaff(data : any){
    return this.http.post(`${this.apiUrl}/add-staff`,data,{
      withCredentials : true
    })
  }
}
