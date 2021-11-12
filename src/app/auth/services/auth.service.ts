import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private cookieService: CookieService,
    private firestore: AngularFirestore) {

    }

  // AUTHENTICATION
  async login(email: string, password: string) {
    try {
      const respuesta = await this.afAuth.signInWithEmailAndPassword(email, password);
      Swal.fire({
        title: '¡Usuario Logueado Correctamente!',
        icon: 'success',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 2000
      })
      return respuesta;

    } catch (error) {
      Swal.fire({
        title: '¡Error al Loguearse!',
        icon: 'error',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 2000
      })
      console.log("Error en login: ",error);
      return null;
    }
  }

  async register(email: string, password: string) {
    try {
      const respuesta = await this.afAuth.createUserWithEmailAndPassword(email, password);
      Swal.fire({
        title: '¡Usuario Regístrado Correctamente!',
        icon: 'success',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 2000
      })
      return respuesta;

    } catch (error) {
      Swal.fire({
        title: '¡Error al Regístrar Usuario',
        icon: 'error',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 2000
      })
      console.log("Error en register: ",error);
      return null;
    }
  }

  async loginWithGoogle() {
    try {
      const respuesta = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      Swal.fire({
        title: '¡Usuario Logueado Correctamente con Google!',
        icon: 'success',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 2000
      })
      return respuesta;

    } catch (error) {
      Swal.fire({
        title: '¡Error al Loguearse con Google!',
        icon: 'error',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 2000
      })
      console.log("Error en login con Google: ",error);
      return null;
    }
  }

  async loginWithFacebook(){
    try {
      const respuesta = await this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
      Swal.fire({
        title: '¡Usuario Logueado Correctamente con Facebook!',
        icon: 'success',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 2000
      })
      return respuesta;
    } catch (error) {
      Swal.fire({
        title: '¡Error al Loguearse con Facebook!',
        icon: 'error',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 2000
      })
      console.log("Error en login con Facebook: ",error);
      return null;
    }
  }

  async loginWithGithub(){
    try {
      const respuesta = await this.afAuth.signInWithPopup(new firebase.auth.GithubAuthProvider());
      Swal.fire({
        title: '¡Usuario Logueado Correctamente con Github!',
        icon: 'success',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 2000
      })
      return respuesta;
    } catch (error) {
      Swal.fire({
        title: '¡Error al Loguearse con Github!',
        icon: 'error',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 2000
      })
      console.log("Error en login con Github: ",error);
      return null;
    }
  }

  getUserLogged() {
    return this.afAuth.authState;
  }

  logout(){
    this.afAuth.signOut();
  }


}
