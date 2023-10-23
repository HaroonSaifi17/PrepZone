import { Component, OnInit } from '@angular/core'

interface carouselImage {
  imageSrc: string
  imageAlt: string
  imageHeading: string
  imageText: string
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  constructor() { }

  height: string = '400px'
  selectedIndex: number = 0
  indicators: boolean = true
  controls: boolean = true
  autoScroll: boolean = true
  images: carouselImage[] = [
    {
      imageSrc: './assets/carousel1.jpg',
      imageAlt: 'carousel1.jpg',
      imageHeading: 'Your Path to JEE & NEET Excellence',
      imageText:
        'Expert Guidance, Comprehensive Resources, and Personalized Support for Your Academic Triumph',
    },
    {
      imageSrc: './assets/carousel2.jpg',
      imageAlt: 'carousel2.jpg',
      imageHeading: 'Ace JEE and NEET with Confidence',
      imageText:
        'Join Us for Unparalleled Coaching, Practice, and Results – Your Future Begins Here',
    },
    {
      imageSrc: './assets/carousel1.jpg',
      imageAlt: 'carousel3.jpg',
      imageHeading: 'Empowering Your JEE and NEET Journey',
      imageText:
        'From Aspirations to Achievements - Experience the Difference of Quality Education and Support',
    },
  ]
  ngOnInit(): void {
    if (this.autoScroll) {
      setInterval(() => {
        this.onNextClick()
      }, 8000)
    }
  }
  selectImage(index: number): string {
    if (index == this.selectedIndex) {
      return 'center'
    }
    else if(index==this.images.length -1  && this.selectedIndex==0){
      return 'left'
    }
    else if (index==this.selectedIndex-1) {
       return 'left'
    }
    return 'right'
  }
  onPrevClick(): void {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images.length - 1
    } else {
      this.selectedIndex--
    }
  }
  onNextClick(): void {
    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0
    } else {
      this.selectedIndex++
    }
  }
}
