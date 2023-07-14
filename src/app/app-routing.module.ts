import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginCallbackComponent } from './pages/login-callback/login-callback.component';
import { StudentComponent } from './pages/student/student.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path:'student',component:StudentComponent,canActivate:[AuthGuard]
  },
  {
    path:'logincallback',component:LoginCallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
