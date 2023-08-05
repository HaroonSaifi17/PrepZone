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
  addMQuestion(difficulty:string,questionText:string,subject:string,exam:string,options:[string,string,string,string],correctOption:number,img:any){
    return this.http.post(environment.trinityApiUrl + '/admin/addMQuestion',{difficulty,questionText,subject,exam,options,correctOption,img} )
  }
  addNQuestion(difficulty:string,questionText:string,subject:string,correctOption:number,img:any){
    return this.http.post(environment.trinityApiUrl + '/admin/addNQuestion',{difficulty,questionText,subject,img,correctOption} )
  }
  checkToken():Observable<{check:boolean}>{
    return this.http.get<{check:boolean}>(environment.trinityApiUrl + '/admin/check')
  }
}
