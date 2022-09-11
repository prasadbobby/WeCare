import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  role!: string;
  loginTitle!: string;
  loginImg!: string;
  loginForm!: FormGroup;
  placeholder!: string;
  errorMessage!: string;
  userData!: any;

  constructor(
    private route: ActivatedRoute, 
    private fb: FormBuilder, 
    private router: Router,
    private loginService: LoginService) { }

  ngOnInit() {
    this.role = this.route.snapshot.paramMap.get('role') ?? '';
    if (this.role === "users") {
      this.loginTitle = "User";
      this.loginImg = "../../assets/Images/UserLogIn.jpg";
      this.placeholder = "User Id";
    }
    else {
      this.loginTitle = "Life Coach";
      this.loginImg = "../../assets/Images/LifeCoachLogIn.jpg";
      this.placeholder = "Coach Id";
    }
    this.loginForm = this.fb.group({
      id: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]]
    });
  }
  login() {
    this.loginService.login(this.role, this.loginForm.value).subscribe(data => {
      console.log(data); 


      for(let i =0 ; i < (<any>data).length ; i++){
        if((<any>data)[i].name === this.loginForm.value.id ){
          console.table((<any>data)[i])
          data = (<any>data)[i]
        }
      }
      
      if(this.loginForm.value.password!==data.password){
        this.errorMessage="Invalid Credentials";
      }
      else{
        this.errorMessage="";
        if(this.role==="users"){
          this.router.navigateByUrl("/user/home");
        }
        else{
          this.router.navigateByUrl("/coach/home");
        }
      }
    }, (error) => this.errorMessage = error);
  }

}
