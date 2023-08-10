import { Component, OnInit } from '@angular/core';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-add-paper',
  templateUrl: './add-paper.component.html',
  styleUrls: ['./add-paper.component.scss']
})
export class AddPaperComponent implements OnInit {

  exam: string = 'jee'
  subject: string = 'all'
  difficulty: string = 'Medium'
  totalQuestions: number = 0
  num: number = 0
  create:boolean=false

  constructor(private adminApi: AdminApiService) {}

  ngOnInit(): void {}

  Questions(m: string, n: string): void {
    if (m == '') {
      m = '0'
    }
    if (n == '') {
      n = '0'
    }
    this.num = parseInt(n)
    this.totalQuestions = parseInt(m) + this.num
  }
  generate(): void {
    let query: string =
      '?exam=' +
      this.exam +
      '&subject=' +
      this.subject +
      '&difficulty=' +
      this.difficulty +
      '&totalQuestions=' +
      this.totalQuestions +
      '&num=' +
      this.num
     this.adminApi.generateTest(query).subscribe()
  }
}
