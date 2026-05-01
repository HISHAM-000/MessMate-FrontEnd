import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessService {

  private apiurl = `${environment.apiUrl}/Mess`;

  constructor(private http : HttpClient) { }

  getMyMess(){
    return this.http.get(`${this.apiurl}/GetMyMess`,{
        withCredentials : true
    })
  }

  updateMess(id : number,data : any){
    return this.http.put(`${this.apiurl}/UpdateMess/${id}`,data,{
        withCredentials : true
    })
  }

  deleteMess(id : number){
    return this.http.delete(`${this.apiurl}/${id}`,{
        withCredentials : true
    })
  }


}