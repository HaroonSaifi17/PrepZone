import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.scss'],
})
export class LoginCallbackComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    let token = localStorage.getItem('token')
    if (token) {
      this.router.navigate(['/student'], {
        queryParams: {
          token: null,
        },
        queryParamsHandling: 'merge',
      })
    } else {
      this.route.queryParams.subscribe((params) => {
        token = params['token']
        if (token) {
          localStorage.setItem('token', token)
          this.router.navigate(['/student'], {
            queryParams: {
              token: null,
            },
            queryParamsHandling: 'merge',
          })
        } else {
          window.location.href = environment.trinityApiUrl + '/login'
        }
      })
    }
  }
}
