import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Chart } from 'chart.js'
import { Observable, Subscription } from 'rxjs'
import { ApiService } from 'src/app/services/api.service'

@Component({
  selector: 'app-student-result-detail',
  templateUrl: './student-result-detail.component.html',
  styleUrls: ['./student-result-detail.component.scss'],
})
export class StudentResultDetailComponent implements OnInit, OnDestroy {
  public scoreChart: any
  private testId: string = ''
  private apisub: Subscription | undefined
  public resultData: {
    test: {
      exam: string
      questionIds: [string]
      totalQuestions: number
      answers: [number]
      num: number
    }
    results: {
      name: string
      subject: [string]
      date: string
      marks: number
      correct: [number]
      wrong: [number]
      result: [number]
      time: number
    }
  } = {
    test: {
      exam: '',
      questionIds: [''],
      totalQuestions: 0,
      answers: [0],
      num: 0,
    },
    results: {
      name: '',
      subject: [''],
      date: '',
      marks: 0,
      correct: [0],
      wrong: [0],
      result: [0],
      time: 0,
    },
  }

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idFromUrl = params.get('id')
      this.testId = idFromUrl !== null ? idFromUrl : ''
      this.apisub = this.api.getresult(this.testId).subscribe(
        (data: any) => {
          this.resultData = data
          let i: number = this.resultData.results.subject.length
          if (i == 3) {
            this.totalMark =
              12 *
              (this.resultData.test.totalQuestions / 3 -
                (this.resultData.test.num / 3 -
                  Math.round(this.resultData.test.num / 6)))
            this.correct =
              data.results.correct[0] +
              data.results.correct[1] +
              data.results.correct[2]
            this.wrong =
              data.results.wrong[0] +
              data.results.wrong[1] +
              data.results.wrong[2]
          } else {
            this.totalMark =
              4 *
              (this.resultData.test.totalQuestions -
                (this.resultData.test.num -
                  Math.round(this.resultData.test.num / 2)))
            this.correct = data.correct[0]
            this.wrong = data.wrong[0]
          }
          this.unattemped = data.test.totalQuestions - this.correct - this.wrong
          this.createScoreChart()
        },
        (error) => {
          console.log(error)
        }
      )
    })
  }
  back(): void {
    this.router.navigate(['student/result/list'])
  }
  ngOnDestroy(): void {
    this.apisub?.unsubscribe()
  }
  totalMark: number = 0
  correct: number = 0
  wrong: number = 0
  unattemped: number = 0
  createScoreChart() {
    this.scoreChart = new Chart('MyChart', {
      type: 'doughnut',
      data: {
        labels: ['Marks Obtained', 'Remaining Marks'],
        datasets: [
          {
            data: [this.correct, this.wrong, this.unattemped],
            backgroundColor: ['#10b981', '#ef4444', '#94a3b8'],
          },
        ],
      },
      options: {
        aspectRatio: 1,
        plugins: {
          legend: {
            display: false,
          },
        },
        cutout: '50%',
      },
    })
  }
}
