import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
 apiResponse$: Observable<boolean>=of(false);
  constructor(private api:ApiService) {
}

  ngOnInit(): void {
    this.apiResponse$ = this.api.checkNewUser();
  }

  userLogout():void{
    this.api.logout()
  }
}
