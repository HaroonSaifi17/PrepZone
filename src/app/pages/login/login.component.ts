import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { GoogleApiService } from 'src/app/services/google-api.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private readonly googleApi: GoogleApiService,private router:Router) {
    if(googleApi.isLoggedIn()){
      router.navigateByUrl('/student')
      console.log('hello')
    }
    console.log(googleApi.isLoggedIn())
  }
  LoggedIn(): void {
    this.googleApi.LoggedIn()
  }

  ngOnInit(): void {}
}
