import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';

declare var izitoast:any;

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit {
  public cliente: any = {
    genero: ''
  };
  public token: any;

  constructor(
    private _clienteService: ClienteService,
    private _adminService: AdminService,
    private _router: Router
  ) { 
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
  }

  registro(registroForm: NgForm){
    console.log(registroForm);
    if (!registroForm.invalid) {
      console.log(this.cliente);
      this._clienteService.registro_cliente_admin(this.cliente, this.token).subscribe(
        (response:any) => {
          console.log(response);
          if (response.status == 'success') {
            izitoast.show({
              title: 'Success',
              titleColor: '#1DC74C',
              color: '#FFF',
              class: 'text-success',
              message: 'Cliente creado correctamente',
              position: 'topRight'
            });
            registroForm.reset();
            this.cliente = {
              genero: '',
              nombre: '',
              apellidos: '',
              f_nacimiento: '',
              email: '',
              password: '',
              telefono: '',
              dni: '',
              role: 'cliente'
            };  
            this._router.navigate(['/panel/clientes']);
          } else {
            izitoast.show({
              title: 'Error',
              titleColor: '#FF0000',
              color: '#FFF',
              class: 'text-danger',
              message: 'Error al crear cliente',
              position: 'topRight'
            });
          }
        },
        (error: any) => {
          console.log(error);
          izitoast.show({
            title: 'Error',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            message: 'Error al crear cliente',
            position: 'topRight'
          });
        }
      );
    } else {
      izitoast.show({
        title: 'Error',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        message: 'Data not valid',
        position: 'topRight'
      });
      return;
    }
  }

}
