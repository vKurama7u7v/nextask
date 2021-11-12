import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { take, switchMap } from 'rxjs/internal/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(private _cookieService: CookieService, private router: Router, private auth: AngularFireAuth){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    // GUARD para proteger vistas con sesiones
    return this.auth.authState.pipe(
      take(1),
      switchMap(async (authState) => {
        if(authState){
          return true;
        } else {
          console.log("No Autenticado");
          Swal.fire({
            title: '¡Necesitas una cuenta para ingresar!',
            icon: 'warning',
            toast: true,
            position: 'bottom-left',
            showConfirmButton: false,
            showCloseButton: true,
            timer: 3000
          })
          this.router.navigate(['/auth/login'])
          return false;
        }
      })
    )
  }


  // checkCookieSession(): boolean{
  //   try {
  //     const token = this._cookieService.check('token');

  //     if(!token){
  //       this.router.navigate(['/auth/login']);
  //     }

  //     console.log("OK OK OK: ", token);
  //     return token;

  //   } catch (error) {
  //     console.log("Algo salio mal: ", error);
  //     return false;
  //   }
  //   // return true;
  // }
}
