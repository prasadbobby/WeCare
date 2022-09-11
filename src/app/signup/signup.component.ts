import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SignupService } from './signup.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  role!:string;
  signupTitle!:string;
  signUpImg!: string;
  formDisplay=true;
  errorMessage="";
  userRegisterForm!:FormGroup;
  coachRegisterForm!:FormGroup;
  userId!:number;
  coachId!:number;

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private signupService: SignupService,
    private router: Router
    ) { }

  ngOnInit() {

    this.role = this.route.snapshot.paramMap.get('role') ?? '';
    if(this.role==="coaches"){
      this.signupTitle="Life Coach Profile";
      this.signUpImg="../../assets/Images/LifeCoachLogIn.jpg";
    }
    else{
      this.signupTitle="User Profile";
      this.signUpImg="../../assets/Images/UserLogIn.jpg"
    }
    this.userRegisterForm=this.fb.group({
      name: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
      password: ['', [Validators.required,Validators.minLength(5), Validators.maxLength(10)]],
      mobileNumber: ['', [Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', ageCalculator],
      gender: ['', Validators.required],
      pincode: ['', [Validators.required,Validators.maxLength(6),Validators.minLength(6)]],
      city: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(20)]],
      state: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(20)]],
      country: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(20)]]
    });

    this.coachRegisterForm=this.fb.group({
      name: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
      password: ['', [Validators.required,Validators.minLength(5), Validators.maxLength(10)]],
      mobileNumber: ['', [Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
      dateOfBirth: ['', ageCalculator],
      gender: ['', Validators.required],
      speciality: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(50)]]
    });
  }

  userregister(){
    this.signupService.register("users",this.userRegisterForm.value).subscribe((data:any) => { 
      console.log(data); this.userId=data.id; this.formDisplay=false
    });
  }
  coachregister(){
    this.signupService.register("coaches",this.coachRegisterForm.value).subscribe((data: any)=> {
       console.log(data); this.coachId=data.id; this.formDisplay=false 
      });
  }

  directLogin(){
    if(this.role==="coaches"){
      this.router.navigateByUrl('/login/coaches');
    }
    else{
      this.router.navigateByUrl('/login/users');
    }
  }


}

function ageCalculator(fc: FormControl) {
  const dob=new Date(fc.value);
  const dobYear =dob.getFullYear();
  const currYear=new Date().getFullYear();
  const age=currYear-dobYear;
  // console.log(age);
  if(age>=20 && age<=100){
    return null;
  } 
  else{
    return { ageInvalid: { message: "Age should be between 20 and 100 years"}};
  }
}
