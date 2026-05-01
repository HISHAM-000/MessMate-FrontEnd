import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Mess } from '../../shared/models/mess.model';

@Injectable({
  providedIn: 'root'
})
export class MessService {

  // Mock Data
  private messes: Mess[] = [
    {
      id: 1,
      name: 'Spice Delight Mess',
      description: 'Authentic Indian Thalis with home-cooked taste.',
      imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.5,
      address: '123 Main St, City Center'
    },
    {
      id: 2,
      name: 'Healthy Bites Meal Prep',
      description: 'Diet-conscious balanced meals for fitness enthusiasts.',
      imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      address: '45 Fitness Blvd, West End'
    },
    {
      id: 3,
      name: 'The Comfort Kitchen',
      description: 'Warm, comforting local cuisine.',
      imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.2,
      address: '78 Oak Avenue, Northside'
    }
  ];

  constructor(private http: HttpClient) {}

  getAllMesses(): Observable<Mess[]> {
    return of(this.messes);
  }

  getMessById(id: number): Observable<Mess | undefined> {
    return of(this.messes.find(m => m.id === id));
  }
}
