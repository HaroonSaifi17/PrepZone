import { Component, OnDestroy, OnInit } from '@angular/core'
import { Chart } from 'chart.js'
import { Subscription } from 'rxjs'
import { ApiService } from 'src/app/services/api.service'
import { JeeData } from 'src/app/services/jeeData.interface'
import { NeetData } from 'src/app/services/neetData.interface'

@Component({
  selector: 'app-neet-dashboard',
  templateUrl: './neet-dashboard.component.html',
  styleUrls: ['./neet-dashboard.component.scss'],
})
export class NeetDashboardComponent implements OnInit, OnDestroy {
  public averageChart: any
  public topChart: any
  public overollAccuracyChart: any
  public bioAccuracyChart: any
  public physicsAccuracyChart: any
  public chemistryAccuracyChart: any
  public timmingChart: any
  public dataSubscription: Subscription | undefined

  public name:string=''
  public topMarks: number = 0
  public averageMarks: number = 0
  public totalMarks: number = 720
  public physicsAccuracy: number = 0
  public chemistryAccuracy: number = 0
  public bioAccuracy: number = 0
  public bioTime: number = 0
  public chemistryTime: number = 0
  public physicsTime: number = 0
  public totalAccuracy = 0

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.dataSubscription = this.api.neetData().subscribe((data:NeetData) => {
      this.name=data.name
      this.topMarks = data.topMarks
      this.averageMarks = data.averageMarks
      this.physicsAccuracy = data.physicsAccuracy
      this.chemistryAccuracy = data.chemistryAccuracy
      this.bioAccuracy = data.bioAccuracy
      this.bioTime = data.bioTime
      this.chemistryTime = data.chemistryTime
      this.physicsTime = data.physicsTime
      this.totalAccuracy = Math.round(
        (this.physicsAccuracy + this.chemistryAccuracy + this.bioAccuracy) / 3
      )
    this.createAverageChart()
    this.createTopChart()
    this.overollAccChart()
    this.physicsAccChart()
    this.chemistryAccChart()
    this.bioAccChart()
    this.timeChart()
    })
  }

  createTopChart() {
    const remainingMarks = this.totalMarks - this.topMarks
    this.topChart = new Chart('MyChart', {
      type: 'doughnut',
      data: {
        labels: ['Marks Obtained', 'Remaining Marks'],
        datasets: [
          {
            data: [this.topMarks, remainingMarks],
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
    const remainingMarks = this.totalMarks - this.averageMarks
    this.averageChart = new Chart('MyChart2', {
      type: 'doughnut',
      data: {
        labels: ['Marks Obtained', 'Remaining Marks'],
        datasets: [
          {
            data: [this.averageMarks, remainingMarks],
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
  overollAccChart() {
    const wrong = 100 - this.totalAccuracy
    this.overollAccuracyChart = new Chart('MyChart3', {
      type: 'doughnut',
      data: {
        labels: ['Correct', 'Wrong'],
        datasets: [
          {
            data: [this.totalAccuracy, wrong],
            backgroundColor: ['blue', 'gray'],
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
        cutout: '70%',
      },
    })
  }
  physicsAccChart() {
    const wrong = 100 - this.physicsAccuracy
    this.physicsAccuracyChart = new Chart('MyChart4', {
      type: 'doughnut',
      data: {
        labels: ['Correct', 'Wrong'],
        datasets: [
          {
            data: [this.physicsAccuracy, wrong],
            backgroundColor: ['blue', 'gray'],
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
  chemistryAccChart() {
    const wrong = 100 - this.chemistryAccuracy
    this.chemistryAccuracyChart = new Chart('MyChart5', {
      type: 'doughnut',
      data: {
        labels: ['Correct', 'Wrong'],
        datasets: [
          {
            data: [this.chemistryAccuracy, wrong],
            backgroundColor: ['blue', 'gray'],
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
  bioAccChart() {
    const wrong = 100 - this.bioAccuracy
    this.bioAccuracyChart = new Chart('MyChart6', {
      type: 'doughnut',
      data: {
        labels: ['Correct', 'Wrong'],
        datasets: [
          {
            data: [this.bioAccuracy, wrong],
            backgroundColor: ['blue', 'gray'],
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
  timeChart() {
    this.timmingChart = new Chart('MyChart7', {
      type: 'bar',
      data: {
        labels: ['Physics', 'Chemistry', 'bio'],
        datasets: [
          {
            data: [this.physicsTime, this.chemistryTime, this.bioTime],
            backgroundColor: ['yellow', 'green', 'blue'],
          },
        ],
      },
      options: {
        aspectRatio: 1.5,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    })
  }
  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe()
  }
}
