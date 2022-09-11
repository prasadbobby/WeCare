import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/login/login.service';
import { UserhomeService } from './userhome.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})

export class UserhomeComponent implements OnInit {

  coachArray:any[]=[];
  userDetails:any;
  coachId!:number;
  appointmentDetails:any;
  appointmentForm!: FormGroup;
  showForm=false;
  confirm=false;

  constructor(private loginService: LoginService, private service: UserhomeService, private fb: FormBuilder) {}
  

  ngOnInit() {
    this.userDetails=this.loginService.userId.id;
    
    this.allcoaches();
    this.appointmentForm=this.fb.group({
      appointmentDate: ['', dateCalculator],
      slot: ['',Validators.required]
    }
    )
  }

  allcoaches(){
    this.service.allcoaches().subscribe(data => {
      this.coachArray=data;
    });
  }

  confirmAppointment(){
    this.appointmentDetails={
      appointmentDate: this.appointmentForm.value.appointmentDate,
      slot: this.appointmentForm.value.slot,
      userId: this.userDetails,
      coachId: this.coachId
    }
    this.service.confirmAppointment(this.appointmentDetails).subscribe(data => {
      console.log(data);
      this.confirm=true;
    });
  }

  goBack(){
    window.history.back();
  }
  
}

function dateCalculator(fc: FormControl) {
  const currDate=new Date().getDate();
  const currMonth=new Date().getMonth();
  const currYear=new Date().getFullYear();
  const value=new Date(fc.value);
  const date=value.getDate();
  const month=value.getMonth();
  const year=value.getFullYear();
  if(currYear==year){
    if(currMonth==month){
      const diff=date-currDate;
      if(diff>0 && diff<8){
        return null;
      }
    }
  }
  return {
    dateInvalid: {
      message: "Date should be any upcoming 7 days"
    }
  }
}

