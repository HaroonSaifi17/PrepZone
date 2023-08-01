import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { ApiService } from 'src/app/services/api.service'

@Component({
  selector: 'app-student-result-detail',
  templateUrl: './student-result-detail.component.html',
  styleUrls: ['./student-result-detail.component.scss'],
})
export class StudentResultDetailComponent implements OnInit,OnDestroy {
  private testId: string = ''
  private apisub:Subscription |undefined
  public resultData:{
      test: {
        exam: string
        questionIds: [string]
        totalQuestions: number
        answers: [number]
      }
      results: {
        name: string
        subject: string
        date: string
        marks: number
        correct: [number]
        wrong: [number]
        result: [number]
        time: number
      }
    }
    | undefined

  constructor(private route: ActivatedRoute, private api: ApiService,private router:Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idFromUrl = params.get('id')
      this.testId = idFromUrl !== null ? idFromUrl : ''
      this.apisub=this.api.getresult(this.testId).subscribe((data)=>{
        this.resultData=data
      },(error)=>{
          console.log(error)
        })
    })
  }
  back():void{
    this.router.navigate(['student/result/list'])
  }
  ngOnDestroy(): void {
      this.apisub?.unsubscribe()
  }
}
