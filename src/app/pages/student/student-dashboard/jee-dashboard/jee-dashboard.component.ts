import { Component, OnInit } from '@angular/core'
import { Chart } from 'chart.js'

@Component({
  selector: 'app-jee-dashboard',
  templateUrl: './jee-dashboard.component.html',
  styleUrls: ['./jee-dashboard.component.scss'],
})
export class JeeDashboardComponent implements OnInit {
  public averageChart: any
  public topChart: any
  constructor() { }

  ngOnInit(): void {
    this.createAverageChart()
    this.createTopChart()
  }

  createTopChart() {
    const marksObtained = 220
    const totalMarks = 300
    const remainingMarks = totalMarks - marksObtained
    const percentage = ((marksObtained / totalMarks) * 100).toFixed(2)
    this.topChart = new Chart('MyChart', {
      type: 'doughnut',
      data: {
        labels: ['Marks Obtained', 'Remaining Marks'],
        datasets: [
          {
            data: [marksObtained, remainingMarks],
            backgroundColor: ['red', 'gray'],
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
        cutout: '80%',
      },
    })
  }
  createAverageChart() {
    const marksObtained = 120
    const totalMarks = 300
    const remainingMarks = totalMarks - marksObtained
    const percentage = ((marksObtained / totalMarks) * 100).toFixed(2)
    this.averageChart = new Chart('MyChart2', {
      type: 'doughnut',
      data: {
        labels: ['Marks Obtained', 'Remaining Marks'],
        datasets: [
          {
            data: [marksObtained, remainingMarks],
            backgroundColor: ['red', 'gray'],
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
        cutout: '80%',
      },
    })
  }
}
