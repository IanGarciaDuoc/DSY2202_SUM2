import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from "rxjs";
import { Firestore,collectionData, collection,doc,docData,getDoc,setDoc,updateDoc,deleteDoc } from "@angular/fire/firestore";
import { map } from 'rxjs/operators';
import { Productos } from '../models/productos.model';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private productsCollection = collection(this.firestore, 'productos');
  constructor(private firestore: Firestore) {}

  ObtenerProductos (): Observable<Productos[]>{
      return collectionData(this.productsCollection, { idField: 'id' }) as Observable<Productos[]>;
  }

  AgregarProduct(product: Productos): Observable<void> {
    const productsRef = collection(this.firestore, 'productos');
    const newDocRef = doc(productsRef);
    return from(setDoc(newDocRef, { ...product })) as Observable<void>;
  }

  updateProduct(id: string, product: Productos): Observable<void> {
    const productDoc = doc(this.firestore, `productos/${id}`);
    return from(updateDoc(productDoc, { ...product })) as Observable<void>;
  }

  deleteProduct(id: string): Observable<void> {
    const productDoc = doc(this.firestore, `productos/${id}`);
    return from(deleteDoc(productDoc)) as Observable<void>;
  }
}