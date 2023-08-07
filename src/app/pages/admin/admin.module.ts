import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgChartsModule } from 'ng2-charts'
import { FormsModule } from '@angular/forms'
import { MathjaxModule } from 'mathjax-angular'
import { AdminComponent } from './admin.component'
import { AdminRoutingModule } from './admin-routing.module';
import { AddQuestionComponent } from './add-question/add-question.component';
import { AddPaperComponent } from './add-paper/add-paper.component'

@NgModule({
  declarations: [
    AddQuestionComponent,
    AddPaperComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgChartsModule,
    FormsModule,
    MathjaxModule.forRoot({
      config: {
        loader: {
          load: ['output/svg', '[tex]/require', '[tex]/ams'],
        },
        tex: {
          inlineMath: [
            ['\\(', '\\)'],
            ['$', '$'],
          ],
          displayMath: [['$$', '$$']],
          packages: ['base', 'require', 'ams'],
        },
        svg: { fontCache: 'global' },
      },
      src: 'https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/startup.js',
    }),
  ],
  bootstrap: [AdminComponent],
})
export class AdminModule {}
