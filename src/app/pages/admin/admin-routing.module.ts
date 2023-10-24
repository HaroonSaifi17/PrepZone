import { Component, NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AdminAuthGuard } from 'src/app/services/admin-auth.guard'
import { AddQuestionComponent } from './add-question/add-question.component'
import { AddPaperComponent } from './add-paper/add-paper.component'
import { AdminComponent } from './admin.component'
import { UploadPdfComponent } from './upload-pdf/upload-pdf.component'
import { DashboardComponent } from './dashboard/dashboard.component'

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminAuthGuard],
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'add', pathMatch: 'full' },
      {
        path: 'add',
        component: AddQuestionComponent,
      },
      {
        path: 'test',
        component: AddPaperComponent,
      },
      {
        path:'upload',
        component: UploadPdfComponent,
      },
      {
        path:'dashboard',
        component: DashboardComponent,
      }
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
