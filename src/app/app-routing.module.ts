import { NgModule } from '@angular/core'
import { ExtraOptions, RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { LoginCallbackComponent } from './pages/login-callback/login-callback.component'
import { NewStudentComponent } from './pages/new-student/new-student.component'
import { JeeDashboardComponent } from './pages/student/student-dashboard/jee-dashboard/jee-dashboard.component'
import { NeetDashboardComponent } from './pages/student/student-dashboard/neet-dashboard/neet-dashboard.component'
import { StudentDashboardComponent } from './pages/student/student-dashboard/student-dashboard.component'
import { StudentNotesComponent } from './pages/student/student-notes/student-notes.component'
import { StudentResultComponent } from './pages/student/student-result/student-result.component'
import { StudentSettingsComponent } from './pages/student/student-settings/student-settings.component'
import { StudentGiveTestComponent } from './pages/student/student-test/student-give-test/student-give-test.component'
import { StudentTestListComponent } from './pages/student/student-test/student-test-list/student-test-list.component'
import { StudentTestComponent } from './pages/student/student-test/student-test.component'
import { StudentComponent } from './pages/student/student.component'
import { AuthGuard } from './services/auth.guard'
import { NewStudentGuard } from './services/new-student.guard'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'newStudent',
    component: NewStudentComponent,
    canActivate: [NewStudentGuard],
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
        children: [
          { path: '', redirectTo: 'jee', pathMatch: 'full' },
          {
            path: 'jee',
            component: JeeDashboardComponent,
          },
          {
            path: 'neet',
            component: NeetDashboardComponent,
          },
          { path: '**', redirectTo: 'jee' },
        ],
      },
      {
        path: 'notes',
        component: StudentNotesComponent,
      },
      {
        path: 'test',
        component: StudentTestComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: StudentTestListComponent,
          },
          {
            path: ':id',
            component: StudentGiveTestComponent,
          },
          { path: '**', redirectTo: 'list' },
        ],
      },
      {
        path: 'settings',
        component: StudentSettingsComponent,
      },
      {
        path: 'result',
        component: StudentResultComponent,
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
export class AppRoutingModule {}
