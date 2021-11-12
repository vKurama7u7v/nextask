import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  idUser: string | null;
  idUsuario = '';

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.idUser = "";
  }

  ngOnInit(): void { }

  onRegister() {
    if (this.registerForm.invalid) {
      Swal.fire({
        title: '¡Algunos Campos estan Vacios!',
        icon: 'info',
        toast: true,
        position: 'bottom-left',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 3000
      })
      return;

    } else {
      const email = this.registerForm.value.email;
      const password = this.registerForm.value.password;

      this._authService.register(email, password).then((res) => {
        console.log(res);
        this.obtenerUsuarioLogeado();
      }).catch((err) => {
        return null;
      });
    }
  }

  IngresarConGoogle() {
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    this._authService.loginWithGoogle().then((res) => {
      console.log(res);
      this.obtenerUsuarioLogeado();
    }).catch((err) => {
      return null;
    });
  }

  obtenerUsuarioLogeado(){
    this._authService.getUserLogged().subscribe(res => {
      this.idUser = String(res?.uid);


      if(this.idUser == 'undefined'){
        console.log("Usuario Undefined: ", this.idUser);

      } else if (this.idUser !== 'undefined'){
        console.log("Obtener id Usuario: ", this.idUser);
        this.idUsuario = this.idUser;
        this.registerForm.reset();
        this.router.navigate(['/dashboard/listas']);
      }
    });
  }

  logout() {
    this._authService.logout();
  }
}
