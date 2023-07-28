import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { JeeData } from './jeeData.interface'
import { NeetData } from './neetData.interface'
import { ProfileData } from './profileData.interface'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private router: Router) { }
  logout(): void {
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }
  profileData(): Observable<ProfileData> {
    return this.http.get<ProfileData>(
      environment.trinityApiUrl + '/student/profileData'
    )
  }
  userImg(): Observable<{ profileImg: string }> {
    return this.http.get<{ profileImg: string }>(
      environment.trinityApiUrl + '/student/profileImg'
    )
  }
  jeeData(): Observable<JeeData> {
    return this.http.get<JeeData>(
      environment.trinityApiUrl + '/student/jeeData'
    )
  }
  neetData(): Observable<NeetData> {
    return this.http.get<NeetData>(
      environment.trinityApiUrl + '/student/neetData'
    )
  }
  checkNew(): Observable<{ isNew: boolean; name: string }> {
    return this.http.get<{ isNew: boolean; name: string }>(
      environment.trinityApiUrl + '/student/checkNew'
    )
  }
  newStudentPost(formData: {
    name: string
    phoneNumber: number
    prep: string
  }) {
    return this.http.post(
      environment.trinityApiUrl + '/student/newStudentPost',
      formData
    )
  }
  pdfData(query: string): Observable<{
    error: boolean
    total: number
    page: number
    limit: number
    pdfs: [
      {
        name: string
        url: string
      }
    ]
    pageno: [number]
  }> {
    return this.http.get<{
      error: boolean
      total: number
      page: number
      limit: number
      pdfs: [
        {
          name: string
          url: string
        }
      ]
      pageno: [number]
    }>(environment.trinityApiUrl + '/notes/pdfs' + query)
  }
  pdfDownload(url: string): Observable<void> {
    return this.http
      .get(environment.trinityApiUrl + '/notes/pdf/' + url, {
        responseType: 'blob',
      })
      .pipe(
        map((data: Blob) => {
          const downloadLink = document.createElement('a')
          downloadLink.href = URL.createObjectURL(data)
          downloadLink.download = 'notes.pdf'
          downloadLink.click()
          URL.revokeObjectURL(downloadLink.href)
        })
      )
  }
  testList(query: string): Observable<{
    error: boolean
    total: number
    page: number
    limit: number
    tests: [
      {
        name: string
        exam: string
        date: string
        totalQuestions: number
        _id: string
      }
    ]
    pageno: [number]
  }> {
    return this.http.get<{
      error: boolean
      total: number
      page: number
      limit: number
      tests: [
        {
          name: string
          exam: string
          date: string
          totalQuestions: number
          _id: string
        }
      ]
      pageno: [number]
    }>(environment.trinityApiUrl + '/student/getTests' + query)
  }
  gettest(id: string): Observable<{
        name: string
        exam: string
        subject: string
        date: string
        totalQuestions: number
        num:number
        questionIds: [string]
  }> {
    return this.http.get<{
        name: string
        exam: string
        subject: string
        date: string
        totalQuestions: number
        num:number
        questionIds: [string]
    }>(environment.trinityApiUrl + '/student/getTest/' + id)
  }
  getquestion(query:string): Observable<{
    questionText:string
    options:[string]
  }> {
    return this.http.get<{
    questionText:string
    options:[string]
    }>(environment.trinityApiUrl + '/student/getQuestion' + query)
  }
  getnquestion(query:string): Observable<{
    questionText:string
    options:[string]
  }> {
    return this.http.get<{
    questionText:string
    options:[string]
    }>(environment.trinityApiUrl + '/student/getnQuestion' + query)
  }
  sendResult(testId:string,choosenOption:[number],time:number){
    return this.http.post(environment.trinityApiUrl + '/student/result' ,{testId:testId,choosenOption:choosenOption,time:time})
  }
}
