import { Component, OnInit } from '@angular/core';
import { AddJsService } from '../add-js.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(
    private _cargarScripts:AddJsService
  ) {
    this._cargarScripts.Cargar(['landing-page/typed']);
  }

  ngOnInit(): void {
  }

}
