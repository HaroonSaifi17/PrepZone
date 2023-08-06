import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public isClassAdded:Boolean=false
  constructor(private router:Router,private adminApi:AdminApiService) { }

  ngOnInit(): void {
    this.adminApi.checkToken().subscribe(d=>{
    },e=>{
        console.log(e)
      })
  }
  addClassToElement(b:any): void {
    this.isClassAdded = !this.isClassAdded
    if(b.style.marginRight=='0px' || b.style.marginRight=='')
  {
     b.style.marginRight='-119.24px'
    }else{
      b.style.marginRight='0px'
    }
  }
  logout():void{
    localStorage.removeItem('admintoken')
    this.router.navigate(['adminlogin'])
  }
  goHome():void{
    this.router.navigate(['/'])
  }
}
