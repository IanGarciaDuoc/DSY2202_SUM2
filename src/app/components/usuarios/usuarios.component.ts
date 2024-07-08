import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../service/usuarios.service';
import { Usuarios } from '../../models/usuarios.model';


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
  usuarios: Usuarios[] = [];
  usuarioSeleccionado: Usuarios = {
    id: '',
    nombre: '',
    email: '',
    password: '',
    rol: ''
  };
  mensajeError: string = '';
isModalOpen: any;

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }
  cargarUsuarios(): void {
    this.usuariosService.ListarUsuarios().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
        this.mensajeError = 'Error al cargar usuarios';
      }
    );
  }

  editarUsuario(usuario: Usuarios): void {
    this.usuarioSeleccionado = { ...usuario };
    this.mostrarModal();
    //pq borraste eso?no se pense que no servia pero si ahi dice clarito... mostrar modal 

  }
  mostrarModal(): void {
    const modal = document.getElementById('editUserModal');
    if (modal) {
      modal.style.display = 'flex';
    }
  }
  eliminarUsuario(email: string): void {
    const usuario = this.usuarios.find(u => u.email === email);
    if (usuario && usuario.id) {
      this.usuariosService.EliminarPorId(usuario.id).then(() => {
        this.cargarUsuarios();
      }).catch(error => {
        console.error('Error al eliminar usuario:', error);
        this.mensajeError = 'Error al eliminar usuario';
      });
    }
  }

  actualizarUsuario(): void {
    if (this.usuarioSeleccionado.id) {
      this.usuariosService.EditarPorId(this.usuarioSeleccionado.id, this.usuarioSeleccionado).then(() => {
        this.cargarUsuarios();
        this.cerrarModal();
      }, error => {
        console.error('Error al actualizar usuario:', error);
        this.mensajeError = 'Error al actualizar usuario';
      });
    }
  }

  cerrarModal(): void {
    const modal = document.getElementById('editUserModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  abrirModal(): void {
    const modal = document.getElementById('editUserModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }
}