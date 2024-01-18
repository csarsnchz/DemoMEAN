import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';

declare var izitoast:any;

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit{

  public cliente: any = {}
  public id: any;
  public token: any;
  public loading_btn = false;
  public load_data = true;

  constructor(
    private _route: ActivatedRoute,
    private _clienteService: ClienteService,
    private _adminService: AdminService,
    private _router: Router
  ) { 
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];

        this._clienteService.obtener_cliente_admin(this.id,this.token).subscribe(
          response => {
            
            if(response.data == undefined){
              console.log('No hay datos');
              this.loading_btn = false;
              this.load_data = false;
            } else {
              console.log('Datos obtenidos');
              this.cliente = response.cliente;
              this.loading_btn = false;
              this.load_data = false;
            }
          },
          error => {
            console.log(<any>error);
          }
        )
        
    })
  }

  actualizar(updateForm: NgForm){
    console.log(updateForm.value);
    if(updateForm.valid){
      this.loading_btn = true;
      this._clienteService.actualizar_cliente_admin(this.id,this.cliente,this.token).subscribe(
        response => {
          if(response.status == 'success'){
            console.log('Cliente actualizado');
            izitoast.show({
              title: 'Success',
              titleColor: '#1DC74C',
              color: '#FFF',
              class: 'text-success',
              message: 'Cliente actualizado correctamente',
              position: 'topRight'
            });
            this.loading_btn = false;
            this._router.navigate(['/panel/clientes']);
          } else {
            console.log('Cliente no actualizado');
          }
        },
        error => {
          console.log(<any>error);
        }
      )
    } else {
      console.log('Formulario no valido');
      izitoast.show({
        title: 'Error',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        message: 'Data not valid',
        position: 'topRight'
      });
    }
  }

}
