import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './pages/home/home.component'
import { NavbarComponent } from './pages/home/navbar/navbar.component'
import { HeroSectionComponent } from './pages/home/hero-section/hero-section.component'
import { AdminLoginComponent } from './pages/admin-login/admin-login.component'
import { AdminComponent } from './pages/admin/admin.component'
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NewStudentComponent } from './pages/new-student/new-student.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CorsInterceptor } from './services/cors.interceptor'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    HeroSectionComponent,
    AdminLoginComponent,
    AdminComponent,
    NewStudentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CorsInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
