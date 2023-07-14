import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from './student.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient,private router:Router) {
  }
  logout():void{
   this.http.get(environment.trinityApiUrl + '/logout')
   localStorage.removeItem('token')
   this.router.navigate(['/'])
  }
  userData():Observable<Student>{
  return this.http.get<Student>(environment.trinityApiUrl + '/student/data')
  }
}
