import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private baseUrl = `${environment.apiUrl}/Menu`;

  constructor(private http: HttpClient) {}

  getTodayMenu(messId: number) {
    return this.http.get(`${this.baseUrl}/get-today-menu/${messId}`);
  }
}
