import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AddJsService } from './../../add-js.service';

@Component({
  selector: 'app-navbar-dashboard',
  templateUrl: './navbar-dashboard.component.html',
  styleUrls: ['./navbar-dashboard.component.css'],
  providers: [AuthService],
})
export class NavbarDashboardComponent implements OnInit {
  userLogged = this._authService.getUserLogged();

  constructor(
    private _cargarScripts:AddJsService,
    private _authService: AuthService,
    private router: Router,) {
  }

  async ngOnInit(){
  }

  logout(){
    this._authService.logout();
  }
}
