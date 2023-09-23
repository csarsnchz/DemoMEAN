import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { inicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";

import { adminGuard } from "./guards/admin.guard";
import { IndexClienteComponent } from "./components/clientes/index-cliente/index-cliente.component";
import { CreateClienteComponent } from "./components/clientes/create-cliente/create-cliente.component";

const appRoute: Routes[
  { path: '', redirectTo: 'inicio', pathMatch: 'full'},
  { path: 'inicio', component: inicioComponent, CanActivateFn: [adminGuard]	},
  
  { path: 'panel', children: [
    {path: 'clientes', component: IndexClienteComponent, CanActivateFn: [adminGuard]},
    {path: 'clientes/registro', component: CreateClienteComponent, CanActivateFn: [adminGuard]}
  ]},
  
  { path: 'login', component: LoginComponent }
]

export const appRoutingProviders: any[] = [];
export const routing ModuleWithProviders<any> = RouterModule.forRoot(appRoute);