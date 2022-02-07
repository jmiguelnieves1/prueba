import { ErrorHandler, Injectable } from '@angular/core';
import { Estudiante } from './interfaces/estudiante.interface';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  
  estudiantes: Estudiante[] = [
    {
      id: 1,
      nombre: 'Jose',
      apellido: 'Nieves',
      edad: 21,
      telefono: '123456789'
    }, 
    {
      id: 2,
      nombre: 'Jose 2',
      apellido: 'Nieves 2',
      edad: 25,
      telefono: '123456789'
    }, 
    {
      id: 3,
      nombre: 'Jose 3',
      apellido: 'Nieves 3',
      edad: 29,
      telefono: '123456789'
    }, 
  ]

  constructor() { }
  
  obtenerEstudiantes(): Estudiante[] {
    return this.estudiantes
  }

  crearEstudiante(estudiante: Estudiante): Estudiante[] {
    estudiante.id = this.estudiantes.length + 1;
    this.estudiantes.push(estudiante);
    return this.estudiantes;
  }

  actualizarEstudiante(id: number, estudiante: Estudiante): Estudiante[] {
    const index = this.estudiantes.findIndex((e) => e.id = id);
    this.estudiantes[index] = {...estudiante};
    return this.estudiantes;
  }

  eliminarEstudiante(id: number): Estudiante[] {
    this.estudiantes = this.estudiantes.filter((e) => e.id !== id);
    return this.estudiantes;
  }
}