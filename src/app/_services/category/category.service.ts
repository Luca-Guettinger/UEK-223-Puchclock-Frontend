import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Entry} from '../../_model/Entry';
import {Category} from '../../_model/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  public loadCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>('http://localhost:8081/categories');
  }
  public saveCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>('http://localhost:8081/categories', category);
  }
  public editCategories(category: Category): Observable<Category> {
    return this.httpClient.put<Category>('http://localhost:8081/categories', category);
  }
  public deleteCategory(id: number): void {
    this.httpClient.delete<Category>('http://localhost:8081/categories/' + id);
  }
}
