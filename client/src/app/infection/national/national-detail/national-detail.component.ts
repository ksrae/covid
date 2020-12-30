import { NationalModel } from 'src/store/national/national.model';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, OnDestroy } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Subscription } from 'rxjs';
import { NationalService } from 'src/store/national/national.service';
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
export class NationalDetailComponent implements OnInit, OnDestroy {
  displayedColumns: string[];
  dataSource = new MatTableDataSource();
  expandedElement;
  subscription = new Subscription();

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private nationalService: NationalService
  ) { }

  ngOnInit(): void {
    this.subscription.add(this.nationalService.infection$.subscribe(x => {
      let dataSource = [];
      for(let source of x.items) {
        let exist = dataSource.find(t => t?.nationNm === source?.nationNm);

        if(!exist) {
          source['history'] = [source];
          dataSource.push(source);
        } else {
          exist['history'].push(source);
        }
      }
      this.displayedColumns = x.header;
      this.dataSource.data = dataSource;
      this.dataSource.sort = this.sort;
    }))

  }
  // onSelect(item: NationalModel) {
  //   this.expandedElement = this.expandedElement === item ? null : item;

  //   // console.log(this.expandedElement);
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
