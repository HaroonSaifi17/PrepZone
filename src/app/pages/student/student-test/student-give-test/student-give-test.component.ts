import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { ApiService } from 'src/app/services/api.service'

@Component({
  selector: 'app-student-give-test',
  templateUrl: './student-give-test.component.html',
  styleUrls: ['./student-give-test.component.scss'],
})
export class StudentGiveTestComponent implements OnInit, OnDestroy {
  public testData:{
        name: string
        exam: string
        subject: string
        date: string
        totalQuestions: number
        questionIds: [string]
      }
    ={
    name:"",
    exam:"",
    subject:"",
    date:"",
    totalQuestions:0,
    questionIds:[""]
  }
  testId: string = ''
  public questionData$:
    | Observable<{
        questionText: string
        options: [string]
      }>
    | undefined
  public query: string = ''
  public subscription: Subscription = new Subscription()
  public index1: number = 0
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
  getTest(): void {
    this.subscription=
      this.api.gettest(this.testId).subscribe(
        (data) => {
          this.testData=data
          this.getQuestion()
        },
        (error) => {
          console.error('Error:', error)
        }
      )
  }
  getQuestion():void{
    let query = '?exam=' + this.testData.exam + '&subject=' + this.testData.subject + '&id=' + this.testData.questionIds[this.index1] 
    this.questionData$=this.api.getquestion(query)
  }
  private timer: any
  private isRunning: boolean = false
  public timeDisplay: string = '00:00:00'

  start() {
    if (!this.isRunning) {
      this.isRunning = true
      const startTime = Date.now() - (this.timer || 0)
      this.timer = setInterval(() => {
        const currentTime = Date.now()
        const elapsedTime = currentTime - startTime
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
  ngOnDestroy() {
    this.subscription.unsubscribe()
    this.stop()
  }
}
