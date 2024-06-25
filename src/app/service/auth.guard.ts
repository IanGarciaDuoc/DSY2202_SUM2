import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * Guardia de autenticación que protege rutas para que solo los usuarios autenticados puedan acceder.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /**
   * Constructor del guardia de autenticación.
   * 
   * @param {AuthService} authService - Servicio de autenticación para verificar el estado de inicio de sesión del usuario.
   * @param {Router} router - Router para redirigir al usuario si no está autenticado.
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Método para determinar si se permite la activación de una ruta.
   * 
   * @param {ActivatedRouteSnapshot} next - Información sobre una ruta que se está activando.
   * @param {RouterStateSnapshot} state - Estado del router en el momento de la activación.
   * @returns {Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree}
   * Un valor booleano o una UrlTree que indica si la ruta puede ser activada.
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
