import { Component, OnInit } from '@angular/core';

/**
 * Componente de usuarios de la aplicación.
 * 
 * Este componente maneja la vista y la lógica para mostrar, editar y eliminar usuarios.
 */
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  usuarioSeleccionado: any = { nombre: '', email: '', password: '' };
  editForm: any;

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Carga la lista de usuarios desde el almacenamiento local.
   */
  ngOnInit(): void {
    this.cargarUsuarios();
  }

  /**
   * Carga los usuarios guardados en el almacenamiento local y los asigna a la propiedad `usuarios`.
   */
  cargarUsuarios(): void {
    const usuariosGuardados = localStorage.getItem('usuarios');
    if (usuariosGuardados) {
      this.usuarios = JSON.parse(usuariosGuardados);
    }
  }

  /**
   * Elimina un usuario de la lista basado en su correo electrónico y actualiza el almacenamiento local.
   * 
   * @param {string} email - El correo electrónico del usuario a eliminar.
   */
  eliminarUsuario(email: string): void {
    this.usuarios = this.usuarios.filter(usuario => usuario.email !== email);
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }

  /**
   * Selecciona un usuario para editarlo y muestra el modal de edición.
   * 
   * @param {any} usuario - El usuario a editar.
   */
  editarUsuario(usuario: any): void {
    this.usuarioSeleccionado = { ...usuario }; // Hacer una copia del usuario para editar
    this.mostrarModal();
  }

  /**
   * Actualiza la información del usuario seleccionado y guarda los cambios en el almacenamiento local.
   */
  actualizarUsuario(): void {
    const index = this.usuarios.findIndex(usuario => usuario.email === this.usuarioSeleccionado.email);
    if (index !== -1) {
      this.usuarios[index] = this.usuarioSeleccionado;
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
      this.cerrarModal();
    }
  }

  /**
   * Muestra el modal de edición del usuario.
   */
  mostrarModal(): void {
    const modal = document.getElementById('editUserModal');
    if (modal) {
      modal.style.display = 'flex';
    }
  }

  /**
   * Cierra el modal de edición del usuario.
   */
  cerrarModal(): void {
    const modal = document.getElementById('editUserModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  /**
   * Método de seguimiento para la directiva ngFor, optimiza el rendimiento al identificar los elementos de una lista.
   * 
   * @param {number} index - El índice del elemento en la lista.
   * @param {any} item - El elemento actual de la lista.
   * @returns {number} El identificador único del elemento.
   */
  trackById(index: number, item: any): number {
    return item.id;
  }
}
