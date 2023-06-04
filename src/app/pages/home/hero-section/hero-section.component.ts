import { Component, OnInit } from '@angular/core'

interface carouselImage {
  imageSrc: string
  imageAlt: string
}
@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss'],
})
export class HeroSectionComponent implements OnInit {
  constructor() { }

  selectedIndex: number = 0
  indicators:boolean=true;
  controls:boolean=true;
  images: carouselImage[] = [
    {
      imageSrc: './assets/images/img1.jpg',
      imageAlt: 'Img1.jpg',
    },
    {
      imageSrc: './assets/images/img1.jpg',
      imageAlt: 'Img1.jpg',
    },
    {
      imageSrc: './assets/images/img1.jpg',
      imageAlt: 'Img1.jpg',
    },
  ]
  ngOnInit(): void { }
  selectImage(index:number):void{
     this.selectedIndex = index;
  }
  onPrevClick():void{
    if(this.selectedIndex === 0){
      this.selectedIndex = this.images.length -1;
    }
    else{
      this.selectedIndex--;
    }
  }
  onNextClick():void{
    if(this.selectedIndex === this.images.length -1){
      this.selectedIndex = 0;
    }
    else{
      this.selectedIndex++;
    }
  }
}
