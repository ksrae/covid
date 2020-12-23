import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [
  ],
  imports: [

    MatToolbarModule,

    MatIconModule,
    MatTabsModule
  ],
  providers: [],
  exports: [
    MatToolbarModule,

    MatIconModule,
    MatTabsModule
  ]
})
export class SharedModule { }
