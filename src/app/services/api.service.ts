import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient,private router:Router) {
  }
  logout():void{
   this.http.get(environment.trinityApiUrl + '/logout')
   this.router.navigate(['/'])
  }
  checkNewUser():Observable<boolean>{
  return this.http.get<boolean>(environment.trinityApiUrl + '/student/check-new')
  }
}
