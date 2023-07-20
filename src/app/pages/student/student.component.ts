import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { ApiService } from 'src/app/services/api.service'

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  profileImg$?: Observable<{profileImg:string}>
  isClassAdded: boolean = false

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.profileImg$ = this.api.userImg()
  }
  addClassToElement(): void {
    this.isClassAdded = !this.isClassAdded
  }

  userLogout(): void {
    this.api.logout()
  }
}
