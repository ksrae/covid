import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit, Input } from '@angular/core';
// import {colorSets} from 'src/app/shared/chart-colorset';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'today-detail',
  templateUrl: './today-detail.component.html',
  styleUrls: ['./today-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodayDetailComponent implements OnInit, AfterViewInit {
  @Input('data') data;
  @Input('header') header;
  displayedColumns: string[];
  dataSource;
  @ViewChild(MatSort) sort: MatSort;
  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = this.header;
    this.dataSource = new MatTableDataSource(this.data);
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

}
