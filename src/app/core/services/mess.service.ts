import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Mess } from '../../shared/models/mess.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessService {

   private baseUrl = `${environment.apiUrl}/Mess`;

  constructor(private http: HttpClient) {}
  
  getAllMess() {
  return this.http.get(`${this.baseUrl}/GetAll`, {
    withCredentials: true
  });
}

  getMessById(id: number) {
  return this.http.get(`${this.baseUrl}/GetMessById`, {
    params: { id: id },
    withCredentials: true
  });
}
  getMyMess(){
    return this.http.get(`${this.baseUrl}/GetMyMess`,{
        withCredentials : true
    })
  }

  updateMess(id : number,data : any){
    return this.http.put(`${this.baseUrl}/UpdateMess/${id}`,data,{
        withCredentials : true
    })
  }

  deleteMess(id : number){
    return this.http.delete(`${this.baseUrl}/${id}`,{
        withCredentials : true
    })
  }
}
