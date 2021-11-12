import { NgModule } from '@angular/core';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ConfigComponent } from './core/components/config/config.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { DetallesListaComponent } from './core/components/detalles-lista/detalles-lista.component';
import { ProfileComponent } from './core/components/profile/profile.component';
import { SessionGuard } from './core/guards/session.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full' },

  {path: 'index', component: LandingPageComponent},

  {path: 'auth/login', component: LoginComponent},
  {path: 'auth/register', component: RegisterComponent},
  {path: 'dashboard/listas', component: DashboardComponent, canActivate: [SessionGuard]},
  {path: 'dashboard/lista/:id', component: DetallesListaComponent, canActivate: [SessionGuard]},

  {path: 'app/perfil', component: ProfileComponent, canActivate: [SessionGuard]},
  {path: 'app/config', component: ConfigComponent, canActivate: [SessionGuard]},


  { path: '**', redirectTo: 'index', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
