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
  public overollAccuracyChart: any
  public mathAccuracyChart: any
  public physicsAccuracyChart: any
  public chemistryAccuracyChart: any
  public timmingChart: any
  public topMarks:number=0
  public averageMarks:number=0
  public totalMarks:number=300
  public physicsAccuracy:number=75
  public chmistryAccuracy:number=80
  public mathAccuracy:number=50

  
  constructor() { }

  ngOnInit(): void {
    this.createAverageChart()
    this.createTopChart()
    this.overollAccChart()
    this.physicsAccChart()
    this.chemistryAccChart()
    this.mathAccChart()
    this.timeChart()
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
  overollAccChart() {
    const correct = 75
    const wrong = 25
    this.overollAccuracyChart = new Chart('MyChart3', {
      type: 'doughnut',
      data: {
        labels: ['Correct', 'Wrong'],
        datasets: [
          {
            data: [correct, wrong],
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
    const correct = 80
    const wrong = 20
    this.physicsAccuracyChart = new Chart('MyChart4', {
      type: 'doughnut',
      data: {
        labels: ['Correct', 'Wrong'],
        datasets: [
          {
            data: [correct, wrong],
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
    const correct = 85
    const wrong = 20
    this.chemistryAccuracyChart = new Chart('MyChart5', {
      type: 'doughnut',
      data: {
        labels: ['Correct', 'Wrong'],
        datasets: [
          {
            data: [correct, wrong],
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
  mathAccChart() {
    const correct = 50
    const wrong = 50
    this.mathAccuracyChart = new Chart('MyChart6', {
      type: 'doughnut',
      data: {
        labels: ['Correct', 'Wrong'],
        datasets: [
          {
            data: [correct, wrong],
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
    const physic = 1.25
    const chemistry = 2
    const math = 3.2
    this.timmingChart = new Chart('MyChart7', {
      type: 'bar',
      data: {
        labels: ['Physics', 'Chemistry','Math'],
        datasets: [
          {
            data: [physic, chemistry,math],
            backgroundColor: ['yellow','green','blue'],
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

}
