import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddJsService } from 'src/app/add-js.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-detalles-lista',
  templateUrl: './detalles-lista.component.html',
  styleUrls: ['./detalles-lista.component.css'],
  providers: [AuthService, CrudService],
})
export class DetallesListaComponent implements OnInit {
  public usuarioLogeado: any;
  public userUID: any;

  idLista: string | null;
  datosLista: any = {};
  tareas: any[] = [];
  datosTarea: any = {};

  constructor(
    private _cargarScripts:AddJsService,
    private _authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute,
    private _crudService: CrudService
  ) {
    _cargarScripts.Cargar(['validaciones/func-sweetalert']);
    this._cargarScripts.Cargar(['navbar/navbar-dashboard']);


    this.idLista = this.aRoute.snapshot.paramMap.get('id');
    console.log("Consultando Lista: ", this.idLista);

    this.esLista();
    this.getDatosTareas();
  }

  ngOnInit(): void {
    this._authService.getUserLogged().subscribe(usuario => {
      this.usuarioLogeado = usuario;
      this.userUID = usuario?.uid;

      console.log("Usuario Logeado vista Detalles: ", this.usuarioLogeado);
      console.log("UID Logeado: ", this.userUID);
    });
  }

  esLista(){
    if (this.idLista !== null) {
      this.datosLista = {}
      this._crudService.getLista(this.idLista).subscribe(data =>{
        if(data.payload.data() !== undefined){
          this.datosLista = {
            id: this.idLista,
            nombre: data.payload.data()['nombre'],
            color: data.payload.data()['color'],
            idUser: data.payload.data()['idRef'],
            fecha_creacion: data.payload.data()['fecha_creacion'],
            fecha_actualizacion: data.payload.data()['fecha_actualizacion'],
            fechaC_Orden: data.payload.data()['fechaC_Orden'],
            fechaA_Orden: data.payload.data()['fechaA_Orden'],
          }
          console.log(this.datosLista);
        } else {
          Swal.fire({
            title: '¡No se encontro la Lista!',
            icon: 'error',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            showCloseButton: true,
            timer: 1000
          })
          this.router.navigate(['/dashboard/listas']);
        }
      })
    }
  }

  eliminarLista(id: string){
    Swal.fire({
      title: 'Estas seguro que deseas eliminar esta Lista?',
      text: 'Todo su contenido será eliminado y no podras revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'Cancelar',
      // confirmButtonTextColor: '#52607a',
    }).then(result => {
      if (result.value){
        this._crudService.eliminarLista(id).then(() => {
          for (let index = 0; index < this.tareas.length; index++) {
            console.log(this.tareas[index].id);
            this._crudService.eliminarTarea(this.tareas[index].id).then(() => {
              console.log("Eliminacion en Cascada: ====> ", this.tareas[index].nombre);
            })
          }
          Swal.fire({
            title: 'Lista Eliminada con Exito!',
            icon: 'success',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            showCloseButton: true,
            timer: 2000
          })
          this.router.navigate(['/dashboard/listas']);
        })
      }
    })
  }

  editarLista(id: string){
    Swal.fire({
      title: 'Editar Lista',
      html:`
      <div class="body-sweetAlert">
        <form class="formularioAddLista">

          <div class="body-form-sweetalert">
            <div class="wrapper-sweetalert">
              <div class="form-input-sweetalert">
                <input type="text" onkeyup="countChars(this);" id="lista_name" spellcheck="false" placeholder="Nombre Lista" value="${this.datosLista.nombre}" maxlength="30" required>
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
      confirmButtonText:'Editar',
      showCloseButton: true,
      preConfirm: () => {
        const lista_name = (<HTMLInputElement>document.getElementById('lista_name')).value;
        const color = (<HTMLInputElement>document.querySelector('input[name="color"]:checked')).value;

        if(!lista_name){
          Swal.showValidationMessage('Porfavor rellena los campos');
        }

        if(!(lista_name !== this.datosLista.nombre || color !== this.datosLista.color)){
          Swal.showValidationMessage('No se detectaron cambios');
        }

        return {idLista:this.idLista, lista_name: lista_name, color: color}
      }
    }).then((result) => {
      if(!(!result.value?.lista_name || !result.value?.color)){
        var FechaActualizacion = new Date();
        const fecha_edicion = FechaActualizacion.getDate() + "/" + (FechaActualizacion.getMonth() + 1) + "/" + FechaActualizacion.getFullYear();

        const lista: any = {
          nombre: result.value?.lista_name,
          color: result.value?.color,
          fecha_actualizacion: fecha_edicion,
          fechaA_Orden: FechaActualizacion
        }

        this._crudService.actualizarLista(id, lista).then(() => {
          Swal.fire({
            title: 'Lista Actualizada con Exito!',
            icon: 'success',
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

  addTarea(){
    Swal.fire({
      title: 'Agregar Nueva Tarea',
      html:`
      <div class="body-sweetAlert">
        <form class="formularioAddLista">

          <div class="body-form-sweetalert">
            <div class="wrapper-sweetalert">
              <div class="form-input-sweetalert">
                <input type="text" onkeyup="countChars(this);" id="tarea_name" spellcheck="false" placeholder="Nombre Tarea" maxlength="30" required>
                <span class="counter" id="counter">30</span>
              </div>
            </div>
          </div>

          <div class="select_item">
            <select name="status" id="status">
                <option value="porhacer" selected> Por Hacer</option>
                <option value="encurso">En Curso</option>
                <option value="finalizada">Finalizada</option>
            </select>
          </div>

        </form>
      </div>
      `,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText:'Agregar',
      showCloseButton: true,
      preConfirm: () => {
        const tarea_name = (<HTMLInputElement>document.getElementById('tarea_name')).value;
        const status = (<HTMLInputElement>document.getElementById('status')).value;

        if(!tarea_name){
          Swal.showValidationMessage('Porfavor rellena los campos')
        }

        return {idUser: this.userUID, idLista: this.idLista, tarea_name: tarea_name, status: status};
      }
    }).then((result) => {

      if(!(!result.value?.tarea_name || ! result.value?.status)){
        var FechaActual = new Date();
        const fecha_creacion = FechaActual.getDate() + "/" + (FechaActual.getMonth() + 1) + "/" + FechaActual.getFullYear();
        var FechaActualizacion = new Date();
        const fecha_edicion = FechaActualizacion.getDate() + "/" + (FechaActualizacion.getMonth() + 1) + "/" + FechaActualizacion.getFullYear();

        const tarea: any = {
          nombre: result.value?.tarea_name,
          status: result.value?.status,
          idUser: result.value?.idUser,
          idLista: result.value?.idLista,
          fecha_creacion: fecha_creacion,
          fecha_actualizacion: fecha_edicion,
          fechaC_Orden: FechaActual,
          fechaA_Orden: FechaActualizacion
        }

        const lista: any = {
          fecha_actualizacion: fecha_edicion,
          fechaA_Orden: FechaActualizacion
        }

        const uidLista = String(this.idLista);

        this._crudService.agregarTarea(tarea).then(() => {

          this._crudService.actualizarLista(uidLista, lista).then(() => {
            console.log('Tarea Creada');
            Swal.fire({
              title: 'Tarea Creada con Exito!',
              icon: 'success',
              toast: true,
              position: 'top',
              showConfirmButton: false,
              showCloseButton: true,
              timer: 2000
            })
          })

        }).catch(err => {
          console.log("Error al crear Tarea: ", err);
          Swal.fire({
            title: 'Error al Crear Tarea!',
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

  getDatosTareas(){
    this._crudService.getDatosTareas().subscribe(data => {
      this.tareas = [];
      data.forEach((element: any) => {
        const T = element.payload.doc.data();

        if(String(this.userUID) === T.idUser){
          if (String(this.idLista) === T.idLista) {
            this.tareas.push({
              id: element.payload.doc.id,
              index: (this.tareas.length + 1),
              ... element.payload.doc.data(),
            });
          }
        }
      })
    })
  }

  eliminarTarea(id: string){
    Swal.fire({
      title: 'Estas seguro que deseas eliminar esta Tarea?',
      text: 'No podras revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'Cancelar',
      // confirmButtonTextColor: '#52607a',
    }).then(result => {
      if(result.value){
        var FechaActualizacion = new Date();
        const fecha_edicion = FechaActualizacion.getDate() + "/" + (FechaActualizacion.getMonth() + 1) + "/" + FechaActualizacion.getFullYear();

        const lista: any = {
          fecha_actualizacion: fecha_edicion,
          fechaA_Orden: FechaActualizacion
        }

        const uidLista = String(this.idLista);

        this._crudService.eliminarTarea(id).then(() => {
          this._crudService.actualizarLista(uidLista, lista).then(() => {
            Swal.fire({
              title: 'Tarea Eliminada con Exito!',
              icon: 'success',
              toast: true,
              position: 'top',
              showConfirmButton: false,
              showCloseButton: true,
              timer: 2000
            })
          })
        })
      }
    })
  }

  esTarea(id: string){
    var i = 0;
    if(id !== null){
      this.datosTarea = {}

      this._crudService.getTarea(id).subscribe(data => {
        if (data.payload.data() !== undefined) {
          this.datosTarea = {
            id: id,
            nombre: data.payload.data()['nombre'],
            status: data.payload.data()['status'],
            fecha_actualizacion: data.payload.data()['fecha_actualizacion'],
            fechaA_Orden: data.payload.data()['fechaA_Orden'],
          }

          i += 1;
          if(i === 1){
            console.log(this.datosTarea);
            this.editarTarea(id, this.datosTarea.nombre, this.datosTarea.status);
          }

        }
      })
    }
  }

  editarTarea(id: string, nombre: string, status: string){
    var textContent = ``;

    if(status === 'encurso'){
      textContent = `
      <option value="porhacer"> Por Hacer</option>
      <option value="encurso" selected>En Curso</option>
      <option value="finalizada">Finalizada</option>
      `;
    } else if(status === 'porhacer'){
      textContent = `
      <option value="porhacer" selected> Por Hacer</option>
      <option value="encurso">En Curso</option>
      <option value="finalizada">Finalizada</option>
      `;
    } else if(status === 'finalizada'){
      textContent = `
      <option value="porhacer"> Por Hacer</option>
      <option value="encurso">En Curso</option>
      <option value="finalizada" selected>Finalizada</option>
      `;
    } else{
      textContent = `
      <option value="porhacer" selected> Por Hacer</option>
      <option value="encurso">En Curso</option>
      <option value="finalizada">Finalizada</option>
      `;
    }

    Swal.fire({
      title: 'Editar Tarea',
      html:`
      <div class="body-sweetAlert">
        <form class="formularioAddLista">

          <div class="body-form-sweetalert">
            <div class="wrapper-sweetalert">
              <div class="form-input-sweetalert">
                <input type="text" onkeyup="countChars(this);" id="tarea_name" spellcheck="false" placeholder="Nombre Tarea" value="${nombre}" maxlength="30" required>
                <span class="counter" id="counter">30</span>
              </div>
            </div>
          </div>

          <div class="select_item">
            <select name="status" id="status">
            ${textContent}
            </select>
          </div>

        </form>
      </div>
      `,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText:'Editar',
      showCloseButton: true,
      preConfirm: () => {
        const tarea_name = (<HTMLInputElement>document.getElementById('tarea_name')).value;
        const status = (<HTMLInputElement>document.getElementById('status')).value;

        if(!tarea_name){
          Swal.showValidationMessage('Porfavor rellena los campos')
        }

        if(!(tarea_name !== this.datosTarea.nombre || status !== this.datosTarea.status)){
          Swal.showValidationMessage('No se detectaron cambios');
        }

        return {idUser: this.userUID, idLista: this.idLista, tarea_name: tarea_name, status: status};
      }
    }).then((result) => {
      if(!(!result.value?.tarea_name || !result.value?.status)){
        var FechaActualizacion = new Date();
        const fecha_edicion = FechaActualizacion.getDate() + "/" + (FechaActualizacion.getMonth() + 1) + "/" + FechaActualizacion.getFullYear();

        const tarea: any = {
          nombre: result.value?.tarea_name,
          status: result.value?.status,
          fecha_actualizacion: fecha_edicion,
          fechaA_Orden: FechaActualizacion
        }

        const lista: any = {
          fecha_actualizacion: fecha_edicion,
          fechaA_Orden: FechaActualizacion
        }

        const uidLista = String(this.idLista);


        this._crudService.actualizarTarea(id, tarea).then(() => {
          this._crudService.actualizarLista(uidLista,lista).then(() => {
            Swal.fire({
              title: 'Lista Actualizada con Exito!',
              icon: 'success',
              toast: true,
              position: 'top',
              showConfirmButton: false,
              showCloseButton: true,
              timer: 2000
            })
          })
        })
      }
    })
  }

}
