import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'flight-time-line', loadComponent: () => import('./time-line/time-line.component').then(mod => mod.TimeLineComponent) },
  { path: 'map', loadComponent: () => import('./map/map.component').then(mod => mod.MapComponent) },
  { path: 'flight-list', loadComponent: () => import('./flight-list/flight-list.component').then(mod => mod.FlightListComponent) },
  { path: 'flight-log-details/:id', loadComponent: () => import('./flight-log/flight-log-details/flight-log-details.component').then(mod => mod.FlightLogDetailsComponent) },
  { path: 'edit-flight-log/:id', loadComponent: () => import('./flight-log/flight-log-edit/flight-log-edit.component').then(mod => mod.FlightLogEditComponent) },
  { path: '', redirectTo: '/flight-time-line', pathMatch: 'full' },
  { path: '**', redirectTo: '/flight-time-line', pathMatch: 'full' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
