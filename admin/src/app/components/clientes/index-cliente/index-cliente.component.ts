import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { response } from 'express';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent implements OnInit{

  public clientes : Array<any> = [];
  public filtro_apellidos : '';
  public filtro_email : '';

  constructor(
    private _clienteService : ClienteService 
  ){}

  ngOnInit(): void {
      this.init_Data();
  }

  init_Data(){
    this._clienteService.listar_clientes_filtro_admin(null,null).subscribe(
      response=>{
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    );
  }

  filtro(tipo){
    
    if(tipo == 'apellidos'){
      if(this.filtro_apellidos){
        this._clienteService.listar_clientes_filtro_admin(tipo,this.filtro_apellidos).subscribe(
          response=>{
            console.log(response);
          },
          error=>{
            console.log(error);
          }
        );
      }else {
        this.init_Data();
      }
    }else if(tipo == 'email'){
      if(this.filtro_email){
        this._clienteService.listar_clientes_filtro_admin(tipo,this.filtro_email).subscribe(
          response=>{
            console.log(response);
          },
          error=>{
            console.log(error);
          }
        );
      }else {
        this.init_Data();
      }
    }

  }

}