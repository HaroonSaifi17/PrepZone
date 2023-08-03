import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  constructor(private http: HttpClient, private router: Router) { }
  login(data:{
    username:string,
    password:string
  }):Observable<{adminToken:string}>{
    return this.http.post<{adminToken:string}>(environment.trinityApiUrl + '/login/admin',data )
  }
}
