import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { CoachprofileService } from './coachprofile.service';


@Component({
  selector: 'app-coachprofile',
  templateUrl: './coachprofile.component.html',
  styleUrls: ['./coachprofile.component.css']
})
export class CoachprofileComponent implements OnInit {

  coach:any;
  coachId!:string;

  constructor(private loginService: LoginService, private service:CoachprofileService) { }

  ngOnInit(): void {
    this.coachId=this.loginService.coachId.id;
    console.log(this.coachId);
    this.viewDetails();
  }
  viewDetails(){
    
    this.service.viewDetails(this.coachId).subscribe(data => {
      // console.log(data);
      this.coach=data;
    });
  }
}
