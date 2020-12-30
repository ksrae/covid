import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { InfectionRoutingModule } from './infection-routing.module';
import { InfectionComponent } from './infection.component';
import { TodayComponent } from './today/today.component';
import { NationalComponent } from './national/national.component';
import { CityComponent } from './city/city.component';
import { GenageComponent } from './genage/genage.component';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TodayDetailComponent } from './today/today-detail/today-detail.component';
import { NationalDetailComponent } from './national/national-detail/national-detail.component';
import { CityDetailComponent } from './city/city-detail/city-detail.component';
import { GenageDetailComponent } from './genage/genage-detail/genage-detail.component';

@NgModule({
  declarations: [InfectionComponent, TodayComponent, NationalComponent, CityComponent, GenageComponent, TodayDetailComponent, NationalDetailComponent, CityDetailComponent, GenageDetailComponent],
  imports: [
    CommonModule,
    InfectionRoutingModule,
    SharedModule,
    NgxChartsModule
  ]
})
export class InfectionModule { }
