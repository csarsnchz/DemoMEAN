import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";

import { AdminGuard } from "./guards/admin.guard";
import { IndexClienteComponent } from "./components/clientes/index-cliente/index-cliente.component";
import { CreateClienteComponent } from "./components/clientes/create-cliente/create-cliente.component";
import { EditClienteComponent } from "./components/clientes/edit-cliente/edit-cliente.component";
import { CreateProductoComponent } from "./components/productos/create-producto/create-producto.component";

const appRoute: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full'},
  { path: 'inicio', component: InicioComponent, canActivate: [AdminGuard]	},
  
  { path: 'panel', children: [
    {path: 'clientes', component: IndexClienteComponent, canActivate: [AdminGuard]},
    {path: 'clientes/registro', component: CreateClienteComponent, canActivate: [AdminGuard]},
    {path: 'clientes/registro/:id', component: EditClienteComponent, canActivate: [AdminGuard]},

    {path: 'productos/registro', component: CreateProductoComponent, canActivate: [AdminGuard]},
  ]},
  
  { path: 'login', component: LoginComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);