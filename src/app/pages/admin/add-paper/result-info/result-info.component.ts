import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result-info',
  templateUrl: './result-info.component.html',
  styleUrl: './result-info.component.scss'
})
export class ResultInfoComponent implements OnInit{
  studentId: string = '';
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idFromUrl = params.get('id');
      this.studentId = idFromUrl !== null ? idFromUrl : '';
    });
  }
}
