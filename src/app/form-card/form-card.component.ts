import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.css']
})
export class FormCardComponent implements OnInit {

  constructor() { }
  imgUrl!:string;
  url!:string;
  ngOnInit(): void {
    this.setValues();
  }
  @Input() user!:string;

  setValues(){
    if(this.user==="Coach"){
      this.imgUrl="../../assets/Images/LifeCoachLogIn.jpg";
      this.url="coaches";
    }
    else{
      this.imgUrl="../../assets/Images/UserLogIn.jpg";
      this.url="users";
    }
  }


}
