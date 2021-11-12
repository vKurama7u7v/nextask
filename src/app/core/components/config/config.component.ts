import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddJsService } from 'src/app/add-js.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
  providers: [AuthService],
})
export class ConfigComponent implements OnInit {
  userLogged = this._authService.getUserLogged();

  constructor(
    private _cargarScripts:AddJsService,
    private _authService: AuthService,
    private router: Router,
  ) {
    this._cargarScripts.Cargar(['navbar/navbar-dashboard']);
  }

  ngOnInit(): void {
  }

  logout(){
    this._authService.logout();
  }
}
