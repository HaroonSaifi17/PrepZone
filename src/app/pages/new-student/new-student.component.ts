import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { ApiService } from 'src/app/services/api.service'

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss'],
})
export class NewStudentComponent implements OnInit {
  public name: string = ''
  constructor(private api:ApiService,private router:Router) { }

  ngOnInit(): void {
    const state = this.router.getCurrentNavigation()?.extras.state
    this.name = state ? state?.['name'] : ['']
  }

  onSubmit(form: NgForm): void {
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
