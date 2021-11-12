import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddJsService } from 'src/app/add-js.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [AuthService],
})
export class ProfileComponent implements OnInit {
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
