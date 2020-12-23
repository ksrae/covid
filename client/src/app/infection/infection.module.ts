import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { InfectionRoutingModule } from './infection-routing.module';
import { InfectionComponent } from './infection.component';
import { TodayComponent } from './today/today.component';
import { NationalComponent } from './national/national.component';
import { CityComponent } from './city/city.component';
import { GenageComponent } from './genage/genage.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [InfectionComponent, TodayComponent, NationalComponent, CityComponent, GenageComponent],
  imports: [
    CommonModule,
    InfectionRoutingModule,
    SharedModule
  ]
})
export class InfectionModule { }
