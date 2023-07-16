import { NgModule } from '@angular/core'
import { ExtraOptions, RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { LoginCallbackComponent } from './pages/login-callback/login-callback.component'
import { StudentDashboardComponent } from './pages/student/student-dashboard/student-dashboard.component'
import { StudentNotesComponent } from './pages/student/student-notes/student-notes.component'
import { StudentSettingsComponent } from './pages/student/student-settings/student-settings.component'
import { StudentTestComponent } from './pages/student/student-test/student-test.component'
import { StudentComponent } from './pages/student/student.component'
import { AuthGuard } from './services/auth.guard'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'student',
    component: StudentComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: StudentDashboardComponent,
      },
      {
        path: 'notes',
        component: StudentNotesComponent,
      },
      {
        path: 'test',
        component: StudentTestComponent,
      },
      {
        path: 'settings',
        component: StudentSettingsComponent,
      },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
  {
    path: 'logincallback',
    component: LoginCallbackComponent,
  },
  { path: '**', redirectTo: '/' },
]

const extraOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
}

@NgModule({
  imports: [RouterModule.forRoot(routes, extraOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
