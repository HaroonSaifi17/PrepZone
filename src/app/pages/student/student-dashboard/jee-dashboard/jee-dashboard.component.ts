import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { JeeData } from 'src/app/services/jeeData.interface';

@Component({
  selector: 'app-jee-dashboard',
  templateUrl: './jee-dashboard.component.html',
  styleUrls: ['./jee-dashboard.component.scss'],
})
export class JeeDashboardComponent implements OnInit {
  data$: Observable<JeeData> | undefined;
  constructor(private api: ApiService) { }
  public doughnutChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [
      { data: [350, 450, 100], label: 'Series A' },
      { data: [50, 150, 120], label: 'Series B' },
      { data: [250, 130, 70], label: 'Series C' },
    ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
  };
  ngOnInit(): void {
    this.data$ = this.api.jeeData();
  }
  getOverollAccuracy(i: number, j: number, k: number): number {
    return Math.floor((i + j + k) / 3);
  }
  roundOff(i: number): number {
    return Math.floor(i);
  }
  dataSet():void{
    this.doughnutChartDatasets=
    [
      { data: [20, 450, 100], label: 'Series A' },
      { data: [50, 150, 120], label: 'Series B' },
      { data: [250, 130, 70], label: 'Series C' },
    ];
  }
}
