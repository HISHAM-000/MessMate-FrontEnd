import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessOwnerService {
  private apiurl = `${environment.apiUrl}/Application`;

  constructor(private http : HttpClient) { }

  resubmit(data: any) {
   return this.http.post(`${this.apiurl}/resubmit-owner`, data,{
      withCredentials: true 
    }
  );
}
}
