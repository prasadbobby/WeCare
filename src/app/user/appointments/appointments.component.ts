import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';
import { AppointmentsService } from './appointments.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  userId!:string;
  appointmentDetails:any[]=[];
  showApp=false;
  reschedule=false;
  appointmentForm!: FormGroup;
  rescheduleId!:string;
  success=false;

  constructor(private route:Router, private fb:FormBuilder, private loginService:LoginService, private service: AppointmentsService) {  }
 ngOnInit(){
   this.userId=this.loginService.userId.id;
   console.log(this.userId);
   this.appointments();
   this.appointmentForm=this.fb.group({
    appointmentDate: ['', dateCalculator],
    slot: ['',Validators.required]
  });
 }

 appointments(){
   this.service.appointments().subscribe(data => {
    //  console.log(data);
    for(let app of data){
      if(app.userId===this.userId){
        this.showApp=true;
        this.appointmentDetails.push(app);
      }
    }
    //  console.log(this.appointmentDetails);
   });
 }

 rescheduleAppointment(){
  //  this.service.rescheduleAppointment();
  console.log("reschedule");
  console.log(this.rescheduleId);
  this.service.rescheduleAppointment(this.rescheduleId, this.appointmentForm.value).subscribe(data =>{
    this.success=true;
    console.log(data)
  });
 }

 cancel(){
  //  this.service.cancel();
  if(confirm("Are you sure?")){
    this.service.cancel(this.rescheduleId).subscribe(data => console.log(data));
    this.route.navigateByUrl('/user/home');

  }
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
