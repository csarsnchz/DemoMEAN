import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { inicioComponent } from "./components/inicio/inicio.component";

import { AdminGuard } from "./guards/admin.guard";

const appRoute: Routes[
  { path: '', component: inicioComponent, canActivate: [AdminGuard]	},
  { path: 'login', component: loginComponent }
]

export const appRoutingProviders: any[] = [];
export const routing ModuleWithProviders<any> = RouterModule.forRoot(appRoute);