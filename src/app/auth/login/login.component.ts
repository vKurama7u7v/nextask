import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  idUser: string | null;
  idUsuario = '';

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private cookieService: CookieService,
    ) {
      this.loginForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      })
      this.idUser = "";
    }

  ngOnInit(): void {}

  onLogin(){
    // if(this.loginForm.value.email.length == 0 || this.loginForm.value.password.length == 0){

    // }
    if(this.loginForm.invalid){
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
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this._authService.login(email, password).then(res => {
        console.log(res)
        this.obtenerUsuarioLogeado();
      }).catch(err => {
        return;
      });
    }
  }

  IngresarConGoogle(){
    this._authService.loginWithGoogle().then(res => {
      console.log(res);
      this.obtenerUsuarioLogeado();
      this.router.navigate(['/dashboard/listas']);
    }).catch(err => {
      return null;
    })
  }

  IngresarConFacebook(){
    this._authService.loginWithFacebook().then(res => {
      console.log(res);
      this.obtenerUsuarioLogeado();
      this.router.navigate(['/dashboard/listas']);
    }).catch(err => {
      return null;
    })
  }

  IngresarConGithub(){
    this._authService.loginWithGithub().then(res => {
      console.log(res);
      this.obtenerUsuarioLogeado();
      this.router.navigate(['/dashboard/listas']);
    }).catch(err => {
      return null;
    })
  }

  obtenerUsuarioLogeado(){
    this._authService.getUserLogged().subscribe(res => {
      this.idUser = String(res?.uid);


      if(this.idUser == 'undefined'){
        console.log("Usuario Undefined: ", this.idUser);

      } else if (this.idUser !== 'undefined'){
        console.log("Obtener id Usuario: ", this.idUser);
        console.log("ResponseOK Login: ", res);

        // const {tokenSession, data} = res;

        this.idUsuario = this.idUser;
        // this.cookieService.set('token', tokenSession, 4, '/');
        this.loginForm.reset();
        this.router.navigate(['/dashboard/listas']);
      }
    });
  }

  logout(){
    this._authService.logout();
  }

}
