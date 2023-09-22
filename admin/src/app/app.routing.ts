import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { inicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";

import { adminGuard } from "./guards/admin.guard";
import { IndexClienteComponent } from "./components/clientes/index-cliente/index-cliente.component";

const appRoute: Routes[
  { path: '', component: inicioComponent, CanActivateFn: [AdminGuard]	},
  
  { path 'panel', children: [
    {path 'clientes', component: IndexClienteComponent, CanActivateFn: [ adminGuard]}
  ]},
  
  { path: 'login', component: LoginComponent }
]

export const appRoutingProviders: any[] = [];
export const routing ModuleWithProviders<any> = RouterModule.forRoot(appRoute);