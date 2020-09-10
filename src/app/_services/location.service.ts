import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Location} from '../_model/Location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient: HttpClient) { }

  public load(): Observable<Location[]> {
    return this.httpClient.get<Location[]>('http://localhost:8081/locations');
  }
  public save(location: Location): Observable<Location> {
    return this.httpClient.post<Location>('http://localhost:8081/locations', location);
  }
  public deleteLocation(id: number): Observable<any> {
    return this.httpClient.delete('http://localhost:8081/locations/' + id);
  }
}
