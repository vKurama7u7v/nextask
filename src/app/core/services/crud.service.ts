import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private firestore: AngularFirestore     // INYECTANDO EN CONTRUCTOR
  ) {

  }

  // CRUD TO-DO-LIST

  /*== LISTAS ==*/
  agregarLista(lista: any): Promise<any> {
    return this.firestore.collection('mis-listas').add(lista);
  }

  getDatosListas(): Observable<any> {
    return this.firestore.collection('mis-listas', res => res.orderBy('fechaA_Orden','desc')).snapshotChanges();
  }

  getLista(idLista: string): Observable<any> {
    return this.firestore.collection('mis-listas').doc(idLista).snapshotChanges();
  }

  eliminarLista(idLista: string): Promise<any> {
    return this.firestore.collection('mis-listas').doc(idLista).delete();
  }

  actualizarLista(idLista: string, data: any): Promise<any> {
    return this.firestore.collection('mis-listas').doc(idLista).update(data);
  }

  /*== TAREA ==*/
  agregarTarea(tarea: any): Promise<any> {
    return this.firestore.collection('mis-tareas').add(tarea);
  }

  getDatosTareas(): Observable<any> {
    return this.firestore.collection('mis-tareas', res => res.orderBy('fechaC_Orden','desc')).snapshotChanges();
  }

  getTarea(idTarea: string): Observable<any> {
    return this.firestore.collection('mis-tareas').doc(idTarea).snapshotChanges();
  }

  eliminarTarea(idTarea: string): Promise<any> {
    return this.firestore.collection('mis-tareas').doc(idTarea).delete();
  }

  actualizarTarea(idTarea: string, data: any): Promise<any> {
    return this.firestore.collection('mis-tareas').doc(idTarea).update(data);
  }
}
