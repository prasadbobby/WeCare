import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  
  { path: 'home', component: HomeComponent },
  { path: 'login/:role', component: LoginComponent },
  { path: 'signup/:role', component: SignupComponent },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'coach', loadChildren:()=> import('./coach/coach.module').then(m=>m.CoachModule) },
  { path: '**', component :HomeComponent },
  { path: '**', component :HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
