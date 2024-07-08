import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
/**
 * Configuración de la aplicación Angular.
 * 
 * Esta configuración define los proveedores necesarios para la detección de cambios, 
 * el enrutamiento y la hidratación del cliente.
 * 
 * @constant {ApplicationConfig} appConfig - Configuración de la aplicación.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideFirebaseApp(() => 
      initializeApp({
        apiKey: "AIzaSyCiDsBsFNQ-KE31iHY4ADCLD2xztxRruAw",
        authDomain: "vinachos-fd78e.firebaseapp.com",
        projectId: "vinachos-fd78e",
        storageBucket: "vinachos-fd78e.appspot.com",
        messagingSenderId: "153508477926",
        appId: "1:153508477926:web:74723125c21f200eb67427",
        measurementId: "G-3DP6PZ5134"
            })
    ), 
    provideFirestore(() => getFirestore())
  ]
};