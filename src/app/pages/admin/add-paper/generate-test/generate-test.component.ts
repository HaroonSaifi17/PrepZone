import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-generate-test',
  templateUrl: './generate-test.component.html',
  styleUrls: ['./generate-test.component.scss'],
})
export class GenerateTestComponent implements OnInit {
  exam: string = 'jee'
  subject: string = 'all'
  difficulty: string = 'Medium'
  totalQuestions: number = 0
  num: number = 0

  constructor() { }

  ngOnInit(): void { }

  Questions(m: string, n: string): void {
    if (m == '') {
          m='0'
    }
    if (n == '') {
          n='0'
    }
    this.num=parseInt(n)
    this.totalQuestions=parseInt(m) + this.num
  }
}
