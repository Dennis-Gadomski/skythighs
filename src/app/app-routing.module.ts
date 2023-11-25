import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'flight-time-line', loadComponent: () => import('./time-line/time-line.component').then(mod => mod.TimeLineComponent) },
  { path: 'map', loadComponent: () => import('./map/map.component').then(mod => mod.MapComponent) },
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
