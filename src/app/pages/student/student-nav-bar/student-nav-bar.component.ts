import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-student-nav-bar',
  templateUrl: './student-nav-bar.component.html',
  styleUrls: ['./student-nav-bar.component.scss'],
})
export class StudentNavBarComponent implements OnInit {
  @Input() profileImg: string | undefined
  isClassAdded: boolean = false

  constructor() { }

  ngOnInit(): void { }
  addClassToElement():void {
    this.isClassAdded = !this.isClassAdded;
  }
}
