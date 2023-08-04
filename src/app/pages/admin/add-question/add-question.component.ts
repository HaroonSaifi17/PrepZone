import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
  questionText:string=" "
  options:[string,string,string,string]=["","","",""]
  exam:string="jee"
  subject:string="physics"
  difficulty:string="Medium"
  multipleType:boolean=true
  correctOption:number=0
  mathEx=["$ x $","$ x/y $"]

  constructor() { }

  ngOnInit(): void {
  }
  addQuestion():void{

  }
  intCon(s:string):number{
    return parseInt(s)
  }


}
