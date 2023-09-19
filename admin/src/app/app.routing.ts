import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const appRoute: Routes[
  { path: '', component: inicioComponent },
  { path: 'login', component: loginComponent }
]

export const appRoutingProviders: any[] = [];
export const routing ModuleWithProviders<any> = RouterModule.forRoot(appRoute);