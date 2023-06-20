import { Injectable } from '@angular/core'
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc'
import { Subject } from 'rxjs'

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin + '/student',
  clientId:
    '94004341890-n5p6bivcp3hgi04q8ssavsst61vpp55a.apps.googleusercontent.com',
  scope: 'openid profile email',
}
export interface UserInfo {
  info: {
    sub: string
    email: string
    name: string
    picture: string
  }
}
@Injectable({
  providedIn: 'root',
})
export class GoogleApiService {
  userProfileSubject = new Subject<UserInfo>()
  constructor(private readonly oAuthService: OAuthService) {}
  LoggedIn(): void {
    this.oAuthService.configure(oAuthConfig)
    this.oAuthService.logoutUrl = 'https://www.google.com?accounts?Logout'
    this.oAuthService.loadDiscoveryDocument().then(() => {
      this.oAuthService.tryLoginImplicitFlow().then(() => {
        if (!this.oAuthService.hasValidIdToken()) {
          this.oAuthService.initLoginFlow()
        } else {
          this.oAuthService.loadUserProfile().then((userProfile) => {
            this.userProfileSubject.next(userProfile as UserInfo)
          })
        }
      })
    })
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidIdToken()
  }

  signout() {
    this.oAuthService.logOut()
  }
}
