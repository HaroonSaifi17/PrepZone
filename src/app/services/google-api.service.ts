import { Injectable } from '@angular/core'
import { AuthConfig, OAuthEvent, OAuthService } from 'angular-oauth2-oidc'
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks'

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin + '/student',
  clientId:
    '94004341890-n5p6bivcp3hgi04q8ssavsst61vpp55a.apps.googleusercontent.com',
  scope: 'openid profile email',
}
@Injectable({
  providedIn: 'root',
})
export class GoogleApiService {
  constructor(private oauthService: OAuthService) {
    oauthService.configure(oAuthConfig)
    oauthService.tokenValidationHandler = new JwksValidationHandler()
  }

  loginWithGoogle() {
    this.oauthService.events.subscribe((event) => {
      console.log(event)
    })
    this.oauthService.loadDiscoveryDocument().then(()=>{
      this.oauthService.tryLoginImplicitFlow().then(()=>{
        if(!this.oauthService.hasValidAccessToken()){
          this.oauthService.initCodeFlow()
        }
        else{
          this.oauthService.loadUserProfile().then((userProfile)=>{
           console.log(userProfile);
          })
        }
      })
    })

    console.log('helloi')
  }
}
