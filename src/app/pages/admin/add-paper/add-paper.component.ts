import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  createData?:[FormData]
  questionText: string = ''
  options: [string, string, string, string] = ['', '', '', '']
  correctOption:number=0
  multipleType: boolean = true
  questionNumber:number=0
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
  number:number=0
  countArray(): any[] {
    return Array(this.number);
  }
  createArray(form:NgForm,img:any):void{

  }
  intCon(s: string): number {
    return parseInt(s)
  }
  previousQuestion(): void {
    if (this.questionNumber > 0) {
      this.questionNumber = this.questionNumber - 1
    }
  }
  nextQuestion(): void {
    if (this.questionNumber < this.totalQuestions-1) {
      this.questionNumber = this.questionNumber + 1
    }
  }
}
