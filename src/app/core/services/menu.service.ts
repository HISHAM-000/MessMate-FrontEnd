import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private baseUrl = `${environment.apiUrl}/Menu`;

  constructor(private http: HttpClient) {}


   getMenu(messId : number,day : number){
    return this.http.get(`${this.baseUrl}/get-menu/${messId}/${day}`,{
      withCredentials : true
    })
  }

  getTodayMenu(messId : number){
    return this.http.get(`${this.baseUrl}/get-today-menu/${messId}`,{
      withCredentials : true
    })
  }

   createMenu(data: any) {
    return this.http.post(`${this.baseUrl}/create-menu`, data, {
      withCredentials: true
    });
  }

  addItems(data: any) {
    return this.http.post(`${this.baseUrl}/add-items`, data, {
      withCredentials: true
    });
  }

  updateItem(itemId: number, data: any) {
    return this.http.put(`${this.baseUrl}/update-items/${itemId}`, data, {
      withCredentials: true
    });
  }

  deleteItem(itemId: number) {
    return this.http.delete(`${this.baseUrl}/delete-items/${itemId}`, {
      withCredentials: true
    });
  }
}
