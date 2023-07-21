import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiService } from 'src/app/services/api.service'

@Component({
  selector: 'app-student-notes',
  templateUrl: './student-notes.component.html',
  styleUrls: ['./student-notes.component.scss'],
})
export class StudentNotesComponent implements OnInit {
  pdfData$:
    | Observable<{
      error: boolean
      total: number
      page: number
      limit: number
      pdfs: [
        {
          name: string
          url: string
        }
      ]
      pageno: number
    }>
    | undefined
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.pdfData$=this.api.pdfData()
  }
  getData():void{
  }
}
