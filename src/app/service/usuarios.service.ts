import { Injectable } from '@angular/core';
import { Firestore,collection,addDoc,doc,query,deleteDoc,getDocs,where,updateDoc, collectionData, docData, QuerySnapshot } from '@angular/fire/firestore';

import { from, map, Observable } from 'rxjs';
import { Usuarios } from '../models/usuarios.model';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usersCollection = collection(this.firestore, 'usuarios');
  constructor(private firestore : Firestore) { }


  ListarUsuarios (): Observable<Usuarios[]> {
    return collectionData(this.usersCollection, { idField: 'id' }) as Observable<Usuarios[]>;

  }

  ObtenerUsuarioPorId(id: string): Observable<Usuarios>{
    const _doc = doc(this.firestore, `usuarios/${id}`);
    return docData(_doc, { idField: 'id' }).pipe(
      map(item => item ? (item as Usuarios) : undefined)
    );  
  }


  EliminarPorId(id: string): Promise<void>{
    const userDoc = doc(this.firestore, `usuarios/${id}`);
    return deleteDoc(userDoc);

  }

  EditarPorId(id: string, usuario: Usuarios): Promise<void>{
    console.log(usuario);
    const _doc = doc(this.firestore, `usuarios/${id}`);
    return updateDoc(_doc, { usuario })}
  
    
  Login (email: string,password: string):Observable<Usuarios>{
    const q = query(this.usersCollection,where(`email`,'==',email),where(`password`,'==',password));
    return from(getDocs(q)).pipe(
      map(querySnapshot =>{
        if(!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          return { id: userDoc.id, ...userDoc.data() } as Usuarios;
        } else {
          throw new Error('Usuario no existe');
        }
      })
    );
  }
  RegistrarUsuario(usuario: Usuarios): Observable<void> {
    return from(addDoc(this.usersCollection, { ...usuario })).pipe(
      map(() => {
        
      })
    );
  }


  RegistrarUsuario2(usuario: Usuarios): Promise<void>{
    return addDoc(this.usersCollection, usuario).then(() => {});

  }
}



