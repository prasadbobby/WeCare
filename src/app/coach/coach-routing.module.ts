import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachhomeComponent } from './coachhome/coachhome.component';
import { CoachprofileComponent } from './coachprofile/coachprofile.component';


const coachRoutes: Routes = [
    {
        path: '',
        children: [
            { path: 'home', component: CoachhomeComponent },
            { path: 'profile', component: CoachprofileComponent },
        ]
    }

];
@NgModule({
    imports: [RouterModule.forChild(coachRoutes)],
    exports: [RouterModule]
})
export class CoachRoutingModule { }
