import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';
import { CoachhomeService } from './coachhome.service';

@Component({
  selector: 'app-coachhome',
  templateUrl: './coachhome.component.html',
  styleUrls: ['./coachhome.component.css']
})
export class CoachhomeComponent implements OnInit {
  coachId!: string;
  imgUrl!: string;
  scheduleDetails:any[]=[];
  msg!: string;
  schedule = false;
  constructor(private loginService: LoginService,private service: CoachhomeService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.coachId=this.loginService.coachId.id;
    console.log(this.coachId);
    this.schedules();
  }
  schedules() {
    this.service.schedules().subscribe(data => {
      // console.log(data);
      for(let i of data){
        // console.log(i);
        // console.log(i.coachId);
        // console.log(this.coachId);
        if(i.coachId===this.coachId){
          this.scheduleDetails.push(i);
        }
      }
      if(this.scheduleDetails.length>0){
        this.schedule=true;
      }
      console.log(this.scheduleDetails);
    });
  }
}
