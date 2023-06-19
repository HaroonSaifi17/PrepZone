import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private socialAuthService: SocialAuthService
  ) { }

  loginWithGoogle(): void {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => this.router.navigate(['student'])).catch((error)=>{
          console.log(error)
      })
  }

  ngOnInit(): void { }
}
