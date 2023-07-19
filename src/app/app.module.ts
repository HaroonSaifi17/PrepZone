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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    NgChartsModule
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: CorsInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
