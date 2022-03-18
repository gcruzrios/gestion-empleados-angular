import { EmpleadoService } from './../empleado.service';
import { Component, OnInit } from '@angular/core';
import { Empleado } from '../empleado';
import { Router } from '@angular/router';
import  swal  from 'sweetalert2';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {


  empleados: Empleado[];

  constructor(private empleadoServicio:EmpleadoService, private router:Router) { }

  ngOnInit(): void {
    this.obtenerEmpleados();
    //this.empleados = [];
  }
  actualizarEmpleado(id:number){
    this.router.navigate(['actualizar-empleado',id]);
  }
  private obtenerEmpleados(){
    this.empleadoServicio.obtenerListaDeEmpleados().subscribe(dato => {
        this.empleados = dato;
    })
  }
    eliminarEmpleado(id:number){

      const swalWithBootstrapButtons = swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Esta seguro de borrar?',
        text: "Esto se no se deshacer!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, borrar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {

        if(result.value){
          this.empleadoServicio.eliminarEmpleado(id).subscribe(dato => {
            console.log(dato);
            this.obtenerEmpleados();
            swal.fire(
              'Empleado eliminado',
              'El empleado ha sido eliminado con exito',
              'success'
            )
          })
        }else if (
            /* Read more about handling dismissals below */
            result.dismiss === swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelado',
              'Accion cancelada  :)',
              'error'
            )
          }



        // if (result.isConfirmed) {

        //   swalWithBootstrapButtons.fire(
        //     'Borrado!',
        //     'Registro ha sido borrado.',
        //     'success'
        //   )
        // }
      })






      //   swal({
      //     title: '¿Estas seguro?',
      //     text: "Confirma si deseas eliminar al empleado",
      //     type: 'warning',
      //     showCancelButton: true,
      //     confirmButtonColor: '#3085d6',
      //     cancelButtonColor: '#d33',
      //     confirmButtonText: 'Si , elimínalo',
      //     cancelButtonText: 'No, cancelar',
      //     confirmButtonClass: 'btn btn-success',
      //     cancelButtonClass: 'btn btn-danger',
      //     buttonsStyling: true
      //   }).then((result) => {
      //
      // })



    }


  verDetallesDelEmpleado(id:number){
    this.router.navigate(['empleado-detalles',id]);
  }

}
