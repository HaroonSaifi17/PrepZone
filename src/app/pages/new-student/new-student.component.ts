import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ApiService } from 'src/app/services/api.service'

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss'],
})
export class NewStudentComponent implements OnInit {
  public name: string = ''
  constructor(private route: ActivatedRoute,private api:ApiService,private router:Router) { }

  ngOnInit(): void {
    const stateData = this.route.snapshot?.data?.['state']
    this.name = stateData ? stateData.name : ''
  }

  onSubmit(form: NgForm): void {
    console.log('Form Data:', form.value)
    this.api.newStudentPost(form.value).subscribe(
      (response) => {
        this.router.navigate(['/student/dashboard/jee'])
      },
      (error) => {
        console.error('Error updating data:', error);
      }
    );
  }
}
