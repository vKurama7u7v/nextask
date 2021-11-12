import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';

const routes: Routes = [
  // {path: '', redirectTo: 'index', pathMatch: 'full' },
  // {path: 'auth/login', component:LoginComponent},
  // {path: '**', redirectTo: 'index', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
