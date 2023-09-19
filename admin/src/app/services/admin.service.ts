import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } form './global';
import { HttpClient, HttpHeaders } from '@angular/commons/http'

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public url;
  
  constructor(
    private _http:HttpClient,  
  ) {
    this.url = global.url;
  }
  login_admin(data):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'login_admin',data,{headers:headers});
  }
}
