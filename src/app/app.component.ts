import { Component } from '@angular/core';
import eruda from 'eruda';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Trinity';
  constructor(){
    eruda.init()
  }
}
