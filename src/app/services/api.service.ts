import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { JeeData } from './jeeData.interface'
import { NeetData } from './neetData.interface'
import { ProfileData } from './profileData.interface'

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
    console.log(formData)
    return this.http.post(
      environment.trinityApiUrl + '/student/newStudentPost',
      formData
    )
  }
  pdfData(): Observable<{
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
    pageno: number
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
      pageno: number
    }>(environment.trinityApiUrl + '/notes/pdfs')
  }
}
