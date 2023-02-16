import { Injectable } from '@angular/core';
import { Alumno } from "../models/alumno";
import {Observable, Subject, BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlumnoServiceService {
  alumnos: Alumno[] = [
    {
      nombre: 'Carlos',
      apellido: 'Herrera',
      fechaNacimiento: new Date(1993, 3, 16),
      email: 'herreradiaz14@gmail.com',
      estaEstudiando: true
    },
    {
      nombre: 'Jennifer',
      apellido: 'Honores',
      fechaNacimiento: new Date(1992, 8, 14),
      email: 'jennifer_honores@hotmail.es',
      estaEstudiando: true
    },
    {
      nombre: 'Marta',
      apellido: 'Díaz',
      fechaNacimiento: new Date(1968, 0, 19),
      email: 'marta_diaz@gmail.com',
      estaEstudiando: false
    },
    {
      nombre: 'Luis',
      apellido: 'Sanchez',
      fechaNacimiento: new Date(1988, 2, 1),
      email: 'luis.sanchez@gmail.com',
      estaEstudiando: false
    },
    {
      nombre: 'Alberto',
      apellido: 'Flores',
      fechaNacimiento: new Date(1990, 11, 10),
      email: 'alberto.flores@outlook.com',
      estaEstudiando: true
    }
  ];

  alumnos$!: Observable<Alumno[]>;
  alumnosSubject: Subject<Alumno[]>

  constructor() {
    this.alumnosSubject = new BehaviorSubject<Alumno[]>(this.alumnos);

    // this.alumnos$ = new Observable<Alumno[]>((suscriptor) => {
    //   suscriptor.next(this.alumnos);
    // })
  }

  obtenerAlumnosPromise(): Promise<Alumno[] | any>{
    return new Promise((resolve, reject) => {
      if(this.alumnos.length > 0){
        resolve(this.alumnos);
      }else{
        reject({
          codigo: 0,
          mensaje: 'No se han encontrado alumnos en la lista'
        });
      }
    });
  }

  obtenerAlumnosObservable(){
    return this.alumnosSubject.asObservable();
  }
}
