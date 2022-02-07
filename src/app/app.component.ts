import { Component, OnInit } from '@angular/core';
import { EstudianteService } from './estudiante.service';
import { Estudiante } from './interfaces/estudiante.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  estudiantes: Estudiante[] = [];
  isEdit: boolean = false;
  isCreate: boolean = false;
  estudiante: Estudiante = {
    nombre: '',
    apellido: '',
    telefono: '',
    id: 0,
    edad: 0
  }

  constructor(
    private estudianteService: EstudianteService
  ) { }

  ngOnInit(): void {
      this.estudiantes = this.estudianteService.obtenerEstudiantes();
  }

  eliminarEstudiante(id: number) {
    this.estudiantes = this.estudianteService.eliminarEstudiante(id);
  }

  AEditarEstudiante(estudiante: Estudiante) {
    this.isEdit = true;
    this.estudiante = {...estudiante};
  }

  editarCrearEstudiante(id: number) {
    if(this.isEdit) {
      this.estudiantes = this.estudianteService.actualizarEstudiante(id, this.estudiante);
      this.isEdit = false; 
    } else if(this.isCreate) {
      this.estudiantes = this.estudianteService.crearEstudiante(this.estudiante);
      this.isCreate = false;
    }
    this.limpiarEstudiante();
  }

  private limpiarEstudiante() {
    this.estudiante = {
      nombre: '',
      apellido: '',
      telefono: '',
      id: 0,
      edad: 0
    }
  }
}