import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { UserprofileService } from './userprofile.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  constructor(private loginService: LoginService, private service: UserprofileService) { }
  
  userId!:string;
  user:any;

  ngOnInit(): void {
    this.userId=this.loginService.userId.id;
    console.log(this.userId);
    this.viewDetails();
  }
  viewDetails(){
    this.service.viewDetails(this.userId).subscribe(data =>{
      this.user=data;
    });
  }


}
