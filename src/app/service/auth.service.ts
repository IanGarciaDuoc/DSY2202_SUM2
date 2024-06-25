import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInStatus = false;

  constructor() {
    if (this.isLocalStorageAvailable()) {
      this.loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');
      if (!localStorage.getItem('usuarios')) {
        localStorage.setItem('usuarios', JSON.stringify([]));
      }
    }
  }

  /**
   * Verifica si el almacenamiento local está disponible.
   * @returns {boolean} Verdadero si el almacenamiento local está disponible, falso de lo contrario.
   */
  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Registra un nuevo usuario.
   * @param {string} email - El correo electrónico del usuario.
   * @param {string} password - La contraseña del usuario.
   * @param {string} nombre - El nombre del usuario.
   * @returns {boolean} Verdadero si el registro fue exitoso, falso si el usuario ya existe o el almacenamiento local no está disponible.
   */
  register(email: string, password: string, nombre: string): boolean {
    if (!this.isLocalStorageAvailable()) {
      return false;
    }
    const users = JSON.parse(localStorage.getItem('usuarios') || '[]');
    if (users.find((user: any) => user.email === email)) {
      return false; // El usuario ya existe
    }
    users.push({ email, password, nombre });
    localStorage.setItem('usuarios', JSON.stringify(users));
    return true;
  }

  /**
   * Inicia sesión de un usuario.
   * @param {string} email - El correo electrónico del usuario.
   * @param {string} password - La contraseña del usuario.
   * @returns {boolean} Verdadero si el inicio de sesión fue exitoso, falso si el usuario no existe o el almacenamiento local no está disponible.
   */
  login(email: string, password: string): boolean {
    if (!this.isLocalStorageAvailable()) {
      return false;
    }
    const users = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const user = users.find((user: any) => user.email === email && user.password === password);
    if (user) {
      this.loggedInStatus = true;
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('email', email);
      localStorage.setItem('nombre', user.nombre); // Guardar el nombre del usuario
      return true;
    }
    return false;
  }

  /**
   * Cierra la sesión del usuario.
   */
  logout(): void {
    if (this.isLocalStorageAvailable()) {
      this.loggedInStatus = false;
      localStorage.setItem('loggedIn', 'false');
      localStorage.removeItem('email');
      localStorage.removeItem('nombre'); // Eliminar el nombre del usuario
    }
  }

  /**
   * Verifica si el usuario está logueado.
   * @returns {boolean} Verdadero si el usuario está logueado, falso de lo contrario.
   */
  isLoggedIn(): boolean {
    return this.isLocalStorageAvailable() && JSON.parse(localStorage.getItem('loggedIn') || 'false');
  }

  /**
   * Obtiene el nombre del usuario logueado.
   * @returns {string | null} El nombre del usuario, o null si no está disponible.
   */
  getNombre(): string | null {
    return this.isLocalStorageAvailable() ? localStorage.getItem('nombre') : null;
  }

  /**
   * Obtiene la información del usuario logueado.
   * @returns {any | null} La información del usuario, o null si no está disponible.
   */
  getUserInfo(): any | null {
    return this.isLocalStorageAvailable() ? localStorage.getItem('sesionUsuario') : null;
  }
}
