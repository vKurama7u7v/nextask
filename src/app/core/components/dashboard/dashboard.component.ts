import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AddJsService } from '../../../add-js.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [AuthService, CrudService],
})
export class DashboardComponent implements OnInit {
  public isLogged = false;
  public usuarioLogeado: any;
  public userUID: any;

  listas: any[] = [];

  constructor(
    private fb: FormBuilder,
    private _cargarScripts:AddJsService,
    private _authService: AuthService,
    private _crudService: CrudService,
    private router: Router,
    private aRoute: ActivatedRoute,
    ) {
      _cargarScripts.Cargar(['validaciones/func-sweetalert']);
      this._cargarScripts.Cargar(['navbar/navbar-dashboard']);
      this.getDatosListas();
    }

  ngOnInit(): void {
    this._authService.getUserLogged().subscribe(usuario => {
      this.usuarioLogeado = usuario;
      this.userUID = usuario?.uid;

      console.log("Usuario Logeado: ", this.usuarioLogeado);
      console.log("UID Logeado: ", this.userUID);

    });
  }

  addLista(){
    Swal.fire({
      title: 'Agregar Nueva Lista',
      html:`
      <div class="body-sweetAlert">
        <form class="formularioAddLista">

          <div class="body-form-sweetalert">
            <div class="wrapper-sweetalert">
              <div class="form-input-sweetalert">
                <input type="text" onkeyup="countChars(this);" id="lista_name" spellcheck="false" placeholder="Nombre Lista" maxlength="30" required>
                <span class="counter" id="counter">30</span>
              </div>
            </div>
          </div>

          <div class="radio">
            <h3>Selecciona un Color</h3>

            <input type="radio" name="color" value="gradiente3" id="color3" checked>
            <label for="color3" id="gradiente3"></label>

            <input type="radio" name="color" value="gradiente1" id="color1">
            <label for="color1" id="gradiente1"></label>

            <input type="radio" name="color" value="gradiente2" id="color2">
            <label for="color2" id="gradiente2"></label>

            <input type="radio" name="color" value="gradiente4" id="color4">
            <label for="color4" id="gradiente4"></label>

            <input type="radio" name="color" value="gradiente5" id="color5">
            <label for="color5" id="gradiente5"></label>
          </div>

        </form>
      </div>
      `,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText:'Crear',
      showCloseButton: true,
      preConfirm: () => {
        const lista_name = (<HTMLInputElement>document.getElementById('lista_name')).value;
        const color = (<HTMLInputElement>document.querySelector('input[name="color"]:checked')).value;

        if(!lista_name){
          Swal.showValidationMessage('Porfavor rellena los campos');
        }

        return {idRef:this.userUID,lista_name: lista_name, color: color}
      }
    }).then((result) => {
      // DESPUES DE VALIDAR EL FORMULARIO


      if(!(!result.value?.lista_name || !result.value.color)) {
        // valores diferentes de UNDEFINED
        // console.log("ID_USER: ",result.value?.idRef);
        // console.log("Name: ",result.value?.lista_name);
        // console.log("Color: ",result.value?.color);

        var FechaActual = new Date();
        const fecha_creacion = FechaActual.getDate() + "/" + (FechaActual.getMonth() + 1) + "/" + FechaActual.getFullYear();
        var FechaActualizacion = new Date();
        const fecha_edicion = FechaActualizacion.getDate() + "/" + (FechaActualizacion.getMonth() + 1) + "/" + FechaActualizacion.getFullYear();

        const lista: any = {
          nombre: result.value?.lista_name,
          color: result.value?.color,
          idRef: result.value?.idRef,
          fecha_creacion: fecha_creacion,
          fecha_actualizacion: fecha_edicion,
          fechaC_Orden: FechaActual,
          fechaA_Orden: FechaActualizacion
        }

        this._crudService.agregarLista(lista).then(() => {
          console.log("Lista creada");
          Swal.fire({
            title: 'Lista Creada con Exito!',
            icon: 'success',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            showCloseButton: true,
            timer: 2000
          })


        }).catch(err => {
          console.log("Error al crear lista: ", err);
          Swal.fire({
            title: 'Error al Crear Lista!',
            icon: 'error',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            showCloseButton: true,
            timer: 2000
          })
        })

      }

    })
  }

  getDatosListas(){
    this._crudService.getDatosListas().subscribe(data => {
      this.listas = [];
      data.forEach((element:any) => {
        const L = element.payload.doc.data();

        if(String(this.userUID) === L.idRef){
          this.listas.push({
            id: element.payload.doc.id,
            ... element.payload.doc.data(),
          })
        }
      })
    })
  }

  alertCons(nombre: string){
    Swal.fire({
      title: `Consultando Lista: "<i>${nombre}</i>"`,
      icon: 'info',
      toast: true,
      position: 'top',
      showConfirmButton: false,
      showCloseButton: true,
      timer: 2000
    })
  }

}