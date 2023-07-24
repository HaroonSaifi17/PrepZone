import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-student-test-list',
  templateUrl: './student-test-list.component.html',
  styleUrls: ['./student-test-list.component.scss']
})
export class StudentTestListComponent implements OnInit {
  public testList$:
    | Observable<{
      error: boolean
      total: number
      page: number
      limit: number
      tests: [
        {
          name: string
          exam: string
          date: string
          totalQuestions:number
        }
      ]
      pageno: [number]
    }>
    | undefined
 public search:string=''
 public subject:string='All'
 public page:number=1
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getData()
  }
  getData():void{
    let query:string='?search=' + this.search + '&subject=' + this.subject + '&page=' + this.page  
    this.testList$=this.api.testList(query)
  }
}
