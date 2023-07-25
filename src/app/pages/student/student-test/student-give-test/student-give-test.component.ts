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
  public testData$:
    | Observable<{
        name: string
        exam: string
        subject: string
        date: string
        totalQuestions: number
        questionIds: [string]
      }>
    | undefined
  testId: string = ''
  public questionData$:
    | Observable<{
        questionText: string
        options: [string]
      }>
    | undefined
  public query: string = ''
  public subscription: Subscription = new Subscription()
  public index1:number=0
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
    this.testData$ = this.api.gettest(this.testId)
    this.getQuestion()
  }
  cancelTest(): void {
    this.router.navigate(['student/test/list'])
  }
  getQuestion(): void {
    this.subscription.add(
      this.testData$?.subscribe(
        (data) => {
          this.query =
            '?id=' +
            data.questionIds[this.index1] +
            '&exam=' +
            data.exam +
            '&subject=' +
            data.subject
          console.log(this.query)
          this.questionData$ = this.api.getquestion(this.query)
        },
        (error) => {
          console.error('Error:', error)
        }
      )
    )
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
