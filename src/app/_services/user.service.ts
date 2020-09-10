import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Location} from '../_model/Location';
import {HttpClient} from '@angular/common/http';
import {User} from '../_model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public load(): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:8081/users');
  }
  public deleteUser(id: number): Observable<any> {
    return this.httpClient.delete('http://localhost:8081/users/' + id);
  }
  public save(user: User): Observable<User> {
    return this.httpClient.post<User>('http://localhost:8081/users', user);
  }

  public getMyself(): Observable<User> {
    return this.httpClient.get<User>('http://localhost:8081/users/me');
  }
}
