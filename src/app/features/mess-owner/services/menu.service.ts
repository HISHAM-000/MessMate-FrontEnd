import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiurl = `${environment.apiUrl}/Menu`;

  constructor(private http : HttpClient) { }

  getMenu(messId : number,day : number){
    return this.http.get(`${this.apiurl}/get-menu/${messId}/${day}`,{
      withCredentials : true
    })
  }

  getTodayMenu(messId : number){
    return this.http.get(`${this.apiurl}/get-today-menu/${messId}`,{
      withCredentials : true
    })
  }

   createMenu(data: any) {
    return this.http.post(`${this.apiurl}/create-menu`, data, {
      withCredentials: true
    });
  }

  addItems(data: any) {
    return this.http.post(`${this.apiurl}/add-items`, data, {
      withCredentials: true
    });
  }

  updateItem(itemId: number, data: any) {
    return this.http.put(`${this.apiurl}/update-items/${itemId}`, data, {
      withCredentials: true
    });
  }

  deleteItem(itemId: number) {
    return this.http.delete(`${this.apiurl}/delete-items/${itemId}`, {
      withCredentials: true
    });
  }
}
