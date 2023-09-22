import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } form './global';
import { HttpClient, HttpHeaders } from '@angular/commons/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public url;
  
  constructor(
    private _http: HttpClient,  
  ) {
    this.url = global.url;
  }

  listar_clientes_filtro_admin():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'listar_clientes_filtro_admin',{headers:headers});
  }

}
