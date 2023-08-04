import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public isClassAdded:Boolean=false
  constructor(private router:Router) { }

  ngOnInit(): void {
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

}
