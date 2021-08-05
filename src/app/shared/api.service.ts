import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  postEmployee(data: any) {
    return this.http.post<any>(
      'https://friends-api-v1.herokuapp.com/api/v1/friends',
      data
    );
  }

  getEmployee() {
    return this.http.get<any>(
      'https://friends-api-v1.herokuapp.com/api/v1/friends'
    );
  }

  updateEmployee(data: any, id?: string) {
    return this.http.patch<any>(
      `https://friends-api-v1.herokuapp.com/api/v1/friends/${id}`,
      data
    );
  }

  deleteEmployee(id: number) {
    return this.http.delete<any>(
      `https://friends-api-v1.herokuapp.com/api/v1/friends/${id}`
    );
  }

  getEmployeeByID(id: number) {
    return this.http.get(
      `https://friends-api-v1.herokuapp.com/api/v1/friends/${id}`
    );
  }
}
