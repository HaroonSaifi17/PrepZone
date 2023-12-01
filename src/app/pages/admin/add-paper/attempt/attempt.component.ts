import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-attempt',
  templateUrl: './attempt.component.html',
  styleUrl: './attempt.component.scss',
})
export class AttemptComponent implements OnInit {
  testId: string = '';
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idFromUrl = params.get('id');
      this.testId = idFromUrl !== null ? idFromUrl : '';
    });
  }
}
