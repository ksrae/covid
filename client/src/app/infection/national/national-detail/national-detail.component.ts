import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit, Input } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'national-detail',
  templateUrl: './national-detail.component.html',
  styleUrls: ['./national-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class NationalDetailComponent implements OnInit, AfterViewInit {
  @Input('data') data;
  @Input('header') header;
  displayedColumns: string[];
  dataSource;
  expandedElement;

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
