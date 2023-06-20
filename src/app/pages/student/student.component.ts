import { Component, OnInit } from '@angular/core';
import { GoogleApiService, UserInfo } from 'src/app/services/google-api.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  userInfo?: UserInfo
  constructor(private googleApi:GoogleApiService) {
      googleApi.userProfileSubject.subscribe(info=>{
         this.userInfo=info
    })
}

  ngOnInit(): void {
  }

}
