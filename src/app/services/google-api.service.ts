import { Injectable } from '@angular/core'
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc'
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks'

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin + '/student',
  clientId:
    '94004341890-n5p6bivcp3hgi04q8ssavsst61vpp55a.apps.googleusercontent.com',
  scope: 'openid profile email',
  responseType: 'id_token token',
  oidc: true,
}
@Injectable({
  providedIn: 'root',
})
export class GoogleApiService {
  constructor(private oauthService: OAuthService) {
    this.configureOAuth();
  }

  loginWithGoogle() {
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndLogin();
    this.oauthService.events.subscribe((event) => {
    console.log('OAuth Event:', event);
      setTimeout(()=>{
this.oauthService.getAccessToken()
      },2000)
  });
  }

  private configureOAuth() {
    this.oauthService.configure(oAuthConfig);
  }
}
