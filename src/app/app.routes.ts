import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

import { AuthGuard } from './service/auth.guard';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Configuración de las rutas de la aplicación.
 */
export const routes: Routes = [
    { path: 'home', component: HomeComponent }, 
    { path: 'productos', component: ProductsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'nosotros', component: NosotrosComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];

/**
 * Módulo de enrutamiento de la aplicación.
 * 
 * Este módulo se encarga de configurar las rutas de la aplicación y exportar el RouterModule configurado.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)], // Importa RouterModule con la configuración de las rutas
  exports: [RouterModule], // Exporta RouterModule para que esté disponible en toda la aplicación
})
export class AppRoutingModule { }
