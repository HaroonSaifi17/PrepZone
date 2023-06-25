import { Component, OnInit } from '@angular/core'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor() { }
  ngOnInit(): void { }
  toggleClass(list: HTMLDivElement):void {
    if (list.style.right == '0px') {
      list.style.right = '-100%'
    } else {
      list.style.right = '0px'
    }
  }
navigateToRoute() {
    window.location.href = environment.trinityApiUrl + '/login'
}
}
