

import {MatTableModule} from '@angular/material/table';
import { NgModule } from '@angular/core';
import {MatSortModule } from '@angular/material/sort';
import {TranslateModule} from '@ngx-translate/core';
@NgModule({
  declarations: [
  ],
  imports: [
    MatSortModule,
    MatTableModule,
    TranslateModule.forChild()
  ],
  providers: [],
  exports: [
    MatSortModule,
    MatTableModule,
    TranslateModule
  ]
})
export class SharedModule { }
