import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

declare var jQuery:any;
declare var $:any;
declare var izitoast:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public user:any = {}
  public usuario:any = {};
  public token:any = '';
  
  constructor(
    private _adminService: AdminService,
    private _router: Router
  ) {
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    if(this.token != null){
      this._router.navigate(['/']);
    }else{
      $('#loginModal').modal('show');
    }
  
  }

  login(LoginForm: { valid: any; }){
    if(LoginForm.valid){
      console.log(this.user);
      let data = {  
        email: this.user.email,
        password: this.user.password
      }
      this._adminService.login_admin(data).subscribe(
        response => {
          if(response.data == undefined){
            izitoast.show({
              title: 'Error',
              titleColor: '#FF0000',
              color: '#FFF',
              class: 'text-danger',
              message: response.message,
              position: 'topRight'
            });
          }else{
            this.usuario = response.data;
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('_id', response.data._id);
            
            this._router.navigate(['/']);
          
        }},
        error => {}
      );
    }else{
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
