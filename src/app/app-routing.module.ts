import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'flight-time-line', loadComponent: () => import('./time-line/time-line.component').then(mod => mod.TimeLineComponent) },
  { path: '**', loadComponent: () => import('./time-line/time-line.component').then(mod => mod.TimeLineComponent) },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
