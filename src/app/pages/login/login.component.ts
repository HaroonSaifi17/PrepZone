import { Component, OnInit } from '@angular/core'
import { GoogleApiService } from 'src/app/services/google-api.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private readonly googleApi: GoogleApiService) {
  }
  LoggedIn(): void {
    this.googleApi.loginWithGoogle()
  }

  ngOnInit(): void {}
}
