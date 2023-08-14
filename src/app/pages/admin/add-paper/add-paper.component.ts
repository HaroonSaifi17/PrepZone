import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { NgForm } from '@angular/forms'
import { AdminApiService } from 'src/app/services/admin-api.service'

@Component({
  selector: 'app-add-paper',
  templateUrl: './add-paper.component.html',
  styleUrls: ['./add-paper.component.scss'],
})
export class AddPaperComponent implements OnInit {
  @ViewChild('img', { static: false }) myInputRef!: ElementRef<HTMLInputElement>
  exam: string = 'jee'
  subject: string = 'all'
  difficulty: string = 'Medium'
  totalQuestions: number = 0
  num: number = 0
  create: boolean = false

  createData: FormData[] = []
  questionText: string = ''
  options: [string, string, string, string] = ['', '', '', '']
  correctOption: number = 0
  multipleType: boolean = true
  questionNumber: number = 0
  constructor(private adminApi: AdminApiService) { }

  ngOnInit(): void { }
  emptyData(): void {
    if (!this.create) {
      const formData = new FormData()
      formData.append('questionText', '')
      formData.append('options', `["", "", "", ""]`)
      formData.append('correctOption', '0')
      formData.append('img', '')
      for (let i = 0; i < this.totalQuestions; i++) {
        this.createData[i] = formData
      }
      this.create = true
    }
  }
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
  number: number = 0
  countArray(): any[] {
    return Array(this.number)
  }
  createArray(img: any): void {
    if (this.multipleType) {
      const formData = new FormData()
      formData.append('questionText', this.questionText)
      formData.append('exam', this.exam)
      formData.append('subject', this.subject)
      formData.append('difficulty', this.difficulty)
      formData.append('options', JSON.stringify(this.options))
      formData.append('correctOption', this.correctOption.toString())
      if (img.files.length !== 0) {
        formData.append('img', img.files[0])
      }
      this.createData[this.questionNumber] = formData
    } else {
      const formData = new FormData()
      formData.append('questionText', this.questionText)
      formData.append('subject', this.subject)
      formData.append('difficulty', this.difficulty)
      formData.append('correctOption', this.correctOption.toString())
      if (img.files.length !== 0) {
        formData.append('img', img.files[0])
      }
      this.createData[this.questionNumber] = formData
    }
  }
  intCon(s: string): number {
    return parseInt(s)
  }
  previousQuestion(f: any): void {
    if (this.questionNumber > 0) {
      this.questionNumber = this.questionNumber - 1
      this.changeInput(this.questionNumber, f)
    }
    this.checkM()
  }
  nextQuestion(f: any): void {
    if (this.questionNumber < this.totalQuestions - 1) {
      this.questionNumber = this.questionNumber + 1
      this.changeInput(this.questionNumber, f)
    }
    this.checkM()
  }
  changeInput(i: number, img: any): void {
    this.questionText = this.createData[i].get('questionText')!.toString()
    this.options = JSON.parse(this.createData[i].get('options')!.toString())
    this.correctOption = parseInt(
      this.createData[i].get('correctOption')!.toString()
    )
    let img1: File = this.createData[i].get('img') ?
    if (img1 !== undefined || img1 !== null || img1 !== '') {
      let fileList = new DataTransfer();
      fileList.items.add(img1);
      let files = fileList.files;
      Object.defineProperty(img, "files", {
        value: files,
        writable: true,
      });
    } else {
      img.value = ''
    }
  }
  checkM(): void {
    if (this.exam == 'jee') {
      if (this.subject == 'all') {
        let num1: number = this.num / 3
        if (
          (this.questionNumber < this.totalQuestions / 3 &&
            this.questionNumber >= this.totalQuestions / 3 - num1) ||
          (this.questionNumber < this.totalQuestions / 1.5 &&
            this.questionNumber >= this.totalQuestions / 1.5 - num1) ||
          this.questionNumber >= this.totalQuestions - num1
        ) {
          this.multipleType = false
        } else {
          this.multipleType = true
        }
      } else {
        if (this.questionNumber >= this.totalQuestions - this.num) {
          this.multipleType = false
        } else {
          this.multipleType = true
        }
      }
    }
  }
}
