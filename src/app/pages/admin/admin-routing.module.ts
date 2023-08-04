import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AdminAuthGuard } from 'src/app/services/admin-auth.guard'
import { AddQuestionComponent } from './add-question/add-question.component'
import { AdminComponent } from './admin.component'

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminAuthGuard],
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'add' ,pathMatch:'full'},
      {
        path: 'add',
        component: AddQuestionComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
