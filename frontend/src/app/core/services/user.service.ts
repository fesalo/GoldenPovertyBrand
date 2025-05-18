import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public http: HttpClient) {}

  private apiUrl = 'http://44.214.111.49/api/usuarios';

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  public postUsers(User: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, User);
  }

  public putUsers(id: number, User: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, User);
  }

  public patchUsers(
    id: number,
    User: Partial<User>
  ): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${id}`, User);
  }
}
