import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JeeData } from './jeeData.interface';
import { NeetData } from './neetData.interface';
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
  jeeData():Observable<JeeData>{
  return this.http.get<JeeData>(environment.trinityApiUrl + '/student/jeeData')
  }
  neetData():Observable<NeetData>{
  return this.http.get<NeetData>(environment.trinityApiUrl + '/student/neetData')
  }
  checkNew():Observable<{isNew:boolean}>{
    return this.http.get<{isNew:boolean}>(environment.trinityApiUrl + '/student/checkNew')
  }
}
