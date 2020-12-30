import { Component, OnInit, ChangeDetectionStrategy, ViewChild, OnDestroy } from '@angular/core';
// import {colorSets} from 'src/app/shared/chart-colorset';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Subscription } from 'rxjs';
import { TodayService } from 'src/store/today/today.service';
@Component({
  selector: 'today-detail',
  templateUrl: './today-detail.component.html',
  styleUrls: ['./today-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodayDetailComponent implements OnInit, OnDestroy {
  displayedColumns: string[];
  dataSource = new MatTableDataSource();
  subscription = new Subscription();

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private todayService: TodayService
  ) { }

  ngOnInit(): void {
    this.subscription.add(this.todayService.infection$.subscribe(x => {
      this.displayedColumns = x.header;
      this.dataSource.data = x.items;
      this.dataSource.sort = this.sort;
    }));

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
