import { Component, OnDestroy, OnInit } from '@angular/core';
import {Alumno} from "./models/alumno";
import { filter, from, interval, map, mergeMap, Observable, of } from 'rxjs';
import {AlumnoServiceService} from "./services/alumno-service.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'ProgramacionReactivaHerrera';
  alumnos!: Alumno[];
  alumnos$: Observable<Alumno[]>;
  suscripcion: any;
  promesa: any;
  mostrar = false;

  constructor(private alumnosService: AlumnoServiceService) {
    this.promesa = alumnosService.obtenerAlumnosPromise().then(result => {
      console.log(result);
    }).catch(error => {
      console.log("Error ", error);
    });

    this.suscripcion = alumnosService.obtenerAlumnosObservable().subscribe({
      next: (alumnos: Alumno[]) => {
        this.alumnos = alumnos;
      },
      error: (error) => {
        console.error(error);
      }
    });
    this.alumnos$ = alumnosService.obtenerAlumnosObservable();
  }

  ngOnInit():void {

  }

  filtrarNoEstudiando(){
    // from(this.alumnos).pipe(
    //   filter((alumno: Alumno) => !alumno.estaEstudiando)
    // )
    //   .subscribe((alumnos) => {
    //     console.log('Desde el from: ', alumnos);
    //   });
    of(this.alumnos).pipe(
      map((alumnos: Alumno[]) => alumnos.filter((alumno: Alumno) => !alumno.estaEstudiando))
    ).subscribe((alumnos) => {
      console.log('Desde el of: ', alumnos);
      // this.alumnos = alumnos;
      this.suscripcion.next(alumnos);
      this.mostrar = true;
    });
  }

  ngOnDestroy(){
    this.suscripcion.unsubscribe();
  }
}

