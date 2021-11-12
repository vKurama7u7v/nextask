import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarLoginComponent } from './shared/navbar-login/navbar-login.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';

import { ReactiveFormsModule } from '@angular/forms';

//MODULOS
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireAuthGuardModule } from '@angular/fire/compat/auth-guard';

//Inicio Service
import { AddJsService } from './add-js.service';
import { NavbarDashboardComponent } from './shared/navbar-dashboard/navbar-dashboard.component';
import { CookieService } from 'ngx-cookie-service';
import { DetallesListaComponent } from './core/components/detalles-lista/detalles-lista.component';
import { ProfileComponent } from './core/components/profile/profile.component';
import { ConfigComponent } from './core/components/config/config.component';

//Fin Service

@NgModule({
  declarations: [
    AppComponent,
    NavbarLoginComponent,
    LoginComponent,
    RegisterComponent,
    LandingPageComponent,
    NavbarDashboardComponent,
    DashboardComponent,
    DetallesListaComponent,
    ProfileComponent,
    ConfigComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireAuthGuardModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),

  ],
  providers: [
    AddJsService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
