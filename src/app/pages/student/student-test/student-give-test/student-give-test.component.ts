import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { ApiService } from 'src/app/services/api.service'
import { trigger, state, style, animate, transition } from '@angular/animations'

@Component({
  selector: 'app-student-give-test',
  templateUrl: './student-give-test.component.html',
  styleUrls: ['./student-give-test.component.scss'],
  animations: [
    trigger('in', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('100ms 50ms ease-in', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 0 }),
        animate('50ms ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
})
export class StudentGiveTestComponent implements OnInit, OnDestroy {
  public testData: {
    name: string
    exam: string
    subject: string
    date: string
    totalQuestions: number
    num: number
    questionIds: [string]
  } = {
    name: '',
    exam: '',
    subject: '',
    date: '',
    num: 0,
    totalQuestions: 0,
    questionIds: [''],
  }
  testId: string = ''
  public questionData$:
    | Observable<{
        questionText: string
        options: [string]
        img:string
      }>
    | undefined
  public query: string = ''
  public subscription: Subscription = new Subscription()
  public index1: number = 0
  public choosenOption: [number] = [999]
  public mul: Number = 0
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idFromUrl = params.get('id')
      this.testId = idFromUrl !== null ? idFromUrl : ''
    })
    this.getTest()
    this.start()
    
  }
  cancelTest(): void {
    this.router.navigate(['student/test/list'])
  }
  public subIndex: number = 0
  getTest(): void {
    this.subscription = this.api.gettest(this.testId).subscribe(
      (data) => {
        this.testData = data
        this.mul = this.testData.totalQuestions - this.testData.num
        this.getQuestion()
        for (let i = 0; i < data.totalQuestions; i++) {
          this.choosenOption.push(999)
        }
      },
      (error) => {
        console.error('Error:', error)
      }
    )
  }

  getQuestion(): void {
    const { exam, subject, totalQuestions, questionIds } = this.testData

    if (subject.length > 1) {
      if (this.index1 > totalQuestions / 3) {
        this.subIndex = 1
      } else if (this.index1 > totalQuestions / 1.5) {
        this.subIndex = 2
      }
    }

    const subjectParam = subject[this.subIndex] || ''
    const questionIdParam = questionIds[this.index1] || ''

    const query = `?exam=${exam}&subject=${subjectParam}&id=${questionIdParam}`

    this.questionData$ =
      this.index1 < this.mul
        ? this.api.getquestion(query)
        : this.api.getnquestion(query)
  }
  private timer: any
  private isRunning: boolean = false
  public timeDisplay: string = '00:00:00'

  elapsedTime: number = 0
  start() {
    if (!this.isRunning) {
      this.isRunning = true
      const startTime = Date.now() - (this.timer || 0)
      this.timer = setInterval(() => {
        const currentTime = Date.now()
        const elapsedTime = currentTime - startTime
        this.elapsedTime = elapsedTime / 1000
        this.timeDisplay = this.msToTime(elapsedTime)
      }, 10)
    }
  }

  stop() {
    clearInterval(this.timer)
    this.isRunning = false
  }

  reset() {
    this.stop()
    this.timeDisplay = '00:00:00'
  }

  private msToTime(duration: number) {
    const milliseconds = Math.floor((duration % 1000) / 10)
    const seconds = Math.floor((duration / 1000) % 60)
    const minutes = Math.floor((duration / (1000 * 60)) % 60)
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

    return (
      this.formatTime(hours) +
      ':' +
      this.formatTime(minutes) +
      ':' +
      this.formatTime(seconds)
    )
  }

  private formatTime(time: number) {
    return time < 10 ? '0' + time : time.toString()
  }
  previousQuestion(f: HTMLAnchorElement): void {
    if (this.index1 > 0) {
      this.index1 = this.index1 - 1
      this.getQuestion()
    }
  }
  nextQuestion(f: HTMLAnchorElement): void {
    if (this.index1 < this.testData.totalQuestions - 1) {
      this.index1 = this.index1 + 1
      this.getQuestion()
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
    this.stop()
  }
  private isResult:boolean=true
  makeResult(): void {
    if(this.isResult){
    this.isResult=false
    this.stop()
    this.api.sendResult(this.testId, this.choosenOption, this.elapsedTime).subscribe(
      (response) => {
          this.router.navigate(['student/result'])
      },
      (error) => {
        console.error('Error updating data:', error);
      }
    );
    }
  }
  goSubject(): void {
    switch (this.subIndex) {
      case 0:
        this.index1 = 0
        break
      case 1:
        this.index1 = this.testData.totalQuestions / 3
        break
      default:
        this.index1 = this.testData.totalQuestions / 1.5
    }
    this.getQuestion()
  }
  public inputValue:string =''
 onInputChange() {
    if (this.inputValue == '' || this.inputValue==null) {
      this.choosenOption[this.index1] = 999;
    } else {
      this.choosenOption[this.index1] = +this.inputValue;
    }
  }
}
