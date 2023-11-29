import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashboardData$:
    | Observable<{
       totalStudent:number,
        jeePhysics:number,
        jeeChemistry:number,
        jeeMath:number,
        numPhysics:number,
        numChemistry:number,
        numMath:number,
        neetPhysics:number,
        neetChemistry:number,
        neetBio:number
      }>
    | undefined;
  search:string=''
  page:number=1
  exam:string='jee'
  displayDiv: boolean = false;
  sortBy:number=1
  constructor(private api: AdminApiService) {
  }
  getData():void{


  }
  toggleDisplay() {
    this.displayDiv = !this.displayDiv;
  }

  ngOnInit(): void {
    this.dashboardData$ = this.api.dashboardData();
  }
}
