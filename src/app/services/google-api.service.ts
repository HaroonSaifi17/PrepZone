import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { AuthConfig, OAuthEvent, OAuthService } from 'angular-oauth2-oidc'
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks'

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin + '/login',
  clientId:
    '94004341890-n5p6bivcp3hgi04q8ssavsst61vpp55a.apps.googleusercontent.com',
  scope: 'openid profile email',
  clearHashAfterLogin: true
}
@Injectable({
  providedIn: 'root',
})
export class GoogleApiService {
  constructor(private oauthService: OAuthService ,private router:Router) {
    this.oauthService.configure(oAuthConfig)
  }
  loggedIn():void{
          this.oauthService.initCodeFlow()
}
  checkLoggedIn():void{
    this.oauthService.tokenValidationHandler = new JwksValidationHandler()
    this.oauthService.loadDiscoveryDocument().then(()=>{
      this.oauthService.tryLoginImplicitFlow().then(()=>{
        if(this.oauthService.hasValidAccessToken()){
          this.router.navigateByUrl('/student')
        }
  })})
}
}
