import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './pages/home/navbar/navbar.component';
import { HeroSectionComponent } from './pages/home/hero-section/hero-section.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './pages/student/student.component';
import { CorsInterceptor } from './services/cors.interceptor';
import { LoginCallbackComponent } from './pages/login-callback/login-callback.component';
import { StudentDashboardComponent } from './pages/student/student-dashboard/student-dashboard.component';
import { StudentTestComponent } from './pages/student/student-test/student-test.component';
import { StudentNotesComponent } from './pages/student/student-notes/student-notes.component';
import { StudentSettingsComponent } from './pages/student/student-settings/student-settings.component';
import { NeetDashboardComponent } from './pages/student/student-dashboard/neet-dashboard/neet-dashboard.component';
import { JeeDashboardComponent } from './pages/student/student-dashboard/jee-dashboard/jee-dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { StudentFooterComponent } from './pages/student/student-footer/student-footer.component';
import { StudentResultComponent } from './pages/student/student-result/student-result.component';
import { NewStudentComponent } from './pages/new-student/new-student.component';
import { FormsModule } from '@angular/forms';
import { StudentTestListComponent } from './pages/student/student-test/student-test-list/student-test-list.component';
import { StudentGiveTestComponent } from './pages/student/student-test/student-give-test/student-give-test.component';
import { BeforeCommaPipe } from './services/before-comma.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MathjaxModule } from 'mathjax-angular';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    HeroSectionComponent,
    StudentComponent,
    LoginCallbackComponent,
    StudentDashboardComponent,
    StudentTestComponent,
    StudentNotesComponent,
    StudentSettingsComponent,
    NeetDashboardComponent,
    JeeDashboardComponent,
    StudentFooterComponent,
    StudentResultComponent,
    NewStudentComponent,
    StudentTestListComponent,
    StudentGiveTestComponent,
    BeforeCommaPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    NgChartsModule,
    FormsModule,
    BrowserAnimationsModule,
MathjaxModule.forRoot({
  "config": {
    "loader": {
      "load": ["output/svg", "[tex]/require", "[tex]/ams"]
    },
    "tex": {
      "inlineMath": [["$", "$"]],
      "packages": ["base", "require", "ams"]
    },
    "svg": { "fontCache": "global" }
  },
  "src": "https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/startup.js"
})
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: CorsInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
