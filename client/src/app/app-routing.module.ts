import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', children: [
      { path: '', redirectTo: 'infection', pathMatch: 'full' },
      { path: 'infection', loadChildren: () => import('./infection/infection.module').then(m => m.InfectionModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
