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
  constructor(private api: AdminApiService) {
  }
  log(d:any){
    console.log(d)
  }
  string(d:number):string{
    return d.toString()
  }

  ngOnInit(): void {
    this.dashboardData$ = this.api.dashboardData();
  }
}
