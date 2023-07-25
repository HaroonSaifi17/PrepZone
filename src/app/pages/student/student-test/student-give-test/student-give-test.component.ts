import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-student-give-test',
  templateUrl: './student-give-test.component.html',
  styleUrls: ['./student-give-test.component.scss']
})
export class StudentGiveTestComponent implements OnInit {
  public testData$:Observable<{
        name: string
        exam: string
        subject: string
        date: string
        totalQuestions: number
        questionIds: [string]
  }> | undefined
  testId:string=''
  constructor(private route:ActivatedRoute,private api:ApiService,private router:Router) { }

  ngOnInit(): void {
this.route.paramMap.subscribe(params => {
      const idFromUrl = params.get('id');
      this.testId = idFromUrl !== null ? idFromUrl : '';
    });
    this.testData$ = this.api.gettest(this.testId)
  }
  cancelTest():void{
    this.router.navigate(['student/test/list'])
  }

}
