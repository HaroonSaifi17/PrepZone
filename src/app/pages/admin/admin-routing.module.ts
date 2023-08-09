import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AdminAuthGuard } from 'src/app/services/admin-auth.guard'
import { AddQuestionComponent } from './add-question/add-question.component'
import { AddPaperComponent } from './add-paper/add-paper.component'
import { AdminComponent } from './admin.component'
import { GenerateTestComponent } from './add-paper/generate-test/generate-test.component'
import { CreateTestComponent } from './add-paper/create-test/create-test.component'

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminAuthGuard],
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'test', pathMatch: 'full' },
      {
        path: 'add',
        component: AddQuestionComponent,
      },
      {
        path: 'test',
        component: AddPaperComponent,
        children: [
          { path: '', redirectTo: 'generate', pathMatch: 'full' },
          {
            path: 'generate',
            component: GenerateTestComponent,
          },
          {
            path: 'create',
            component: CreateTestComponent,
          },
        ],
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
