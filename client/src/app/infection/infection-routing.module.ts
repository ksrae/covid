import { GenageComponent } from './genage/genage.component';
import { CityComponent } from './city/city.component';
import { NationalComponent } from './national/national.component';
import { TodayComponent } from './today/today.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfectionComponent } from './infection.component';

const routes: Routes = [
  { path: '', children: [
    {path: '', redirectTo:'today', pathMatch: 'full'},
    {path: 'today', component: TodayComponent },
    {path: 'national', component: NationalComponent },
    {path: 'city', component: CityComponent },
    {path: 'genage', component: GenageComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfectionRoutingModule { }
