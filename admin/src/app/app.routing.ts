import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { inicioComponent } from "./components/inicio/inicio.component";

const appRoute : Routes [
  {path: '', component: inicioComponent}
]

export const appRoutingProviders:  any[]=[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);