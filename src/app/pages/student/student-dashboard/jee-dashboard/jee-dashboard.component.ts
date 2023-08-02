import { Component, OnDestroy, OnInit } from '@angular/core'
import { Chart } from 'chart.js'
import { Subscription } from 'rxjs'
import { ApiService } from 'src/app/services/api.service'
import { JeeData } from 'src/app/services/jeeData.interface'

@Component({
  selector: 'app-jee-dashboard',
  templateUrl: './jee-dashboard.component.html',
  styleUrls: ['./jee-dashboard.component.scss'],
})
export class JeeDashboardComponent implements OnInit, OnDestroy {
  public averageChart: any
  public topChart: any
  public overollAccuracyChart: any
  public mathAccuracyChart: any
  public physicsAccuracyChart: any
  public chemistryAccuracyChart: any
  public timmingChart: any
  public dataSubscription: Subscription | undefined

  public name:string=''
  public topMarks: number = 0
  public averageMarks: number = 0
  public totalMarks: number = 300
  public physicsAccuracy: number = 0
  public chemistryAccuracy: number = 0
  public mathAccuracy: number = 0
  public mathTime: number = 0
  public chemistryTime: number = 0
  public physicsTime: number = 0
  public totalAccuracy = 0

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.dataSubscription = this.api.jeeData().subscribe((data:JeeData) => {
      this.name=data.name
      this.topMarks = Math.floor(data.topMarks)
      this.averageMarks = Math.floor(data.averageMarks)
      this.physicsAccuracy = Math.floor(data.physicsAccuracy)
      this.chemistryAccuracy = Math.floor(data.chemistryAccuracy)
      this.mathAccuracy = Math.floor(data.mathAccuracy)
      this.mathTime = Math.floor(data.mathTime)
      this.chemistryTime = Math.floor(data.chemistryTime)
      this.physicsTime = Math.floor(data.physicsTime)
      this.totalAccuracy = Math.round(
        (this.physicsAccuracy + this.chemistryAccuracy + this.mathAccuracy) / 3
      )
    this.createAverageChart()
    this.createTopChart()
    this.overollAccChart()
    this.physicsAccChart()
    this.chemistryAccChart()
    this.mathAccChart()
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
            backgroundColor: ['#f43f5e', 'gray'],
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
            backgroundColor: ['#a855f7', 'gray'],
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
  mathAccChart() {
    const wrong = 100 - this.mathAccuracy
    this.mathAccuracyChart = new Chart('MyChart6', {
      type: 'doughnut',
      data: {
        labels: ['Correct', 'Wrong'],
        datasets: [
          {
            data: [this.mathAccuracy, wrong],
            backgroundColor: ['#0ea5e9', 'gray'],
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
        labels: ['Physics', 'Chemistry', 'Math'],
        datasets: [
          {
            data: [this.physicsTime, this.chemistryTime, this.mathTime],
            backgroundColor: ['#f43f5e', '#a855f7', '#0ea5e9'],
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
