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
  addMQuestion(formData:FormData):Observable<{id:string}>{
    return this.http.post<{id:string}>(environment.trinityApiUrl + '/admin/addMQuestion',formData )
  }
  addNQuestion(formData:FormData):Observable<{id:string}>{
    return this.http.post<{id:string}>(environment.trinityApiUrl + '/admin/addNQuestion',formData )
  }
  checkToken():Observable<{check:boolean}>{
    return this.http.get<{check:boolean}>(environment.trinityApiUrl + '/admin/check')
  }
  generateTest(query:string):Observable<void>{
    return this.http.get<void>(environment.trinityApiUrl + '/admin/GeneratePaper'+ query)
  }
  createTest(data:{
        name: string,
        subject: string,
        exam: string,
        num: number,
        totalQuestions:number,
        questionIds:string,
        answers:string,
  }){
    return this.http.post(environment.trinityApiUrl + '/admin/CreatePaper',data)
  }
}
