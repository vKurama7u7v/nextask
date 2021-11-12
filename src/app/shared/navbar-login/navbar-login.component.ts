import { Component, OnInit } from '@angular/core';
import { AddJsService } from './../../add-js.service';

@Component({
  selector: 'app-navbar-login',
  templateUrl: './navbar-login.component.html',
  styleUrls: ['./navbar-login.component.css']
})
export class NavbarLoginComponent implements OnInit {

  constructor(private _cargarScripts:AddJsService) {
    _cargarScripts.Cargar(['navbar/navbar-login']);
   }

  ngOnInit(): void {
  }

}
