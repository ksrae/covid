import { GenageModel } from 'src/store/genage/genage.model';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, OnDestroy } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Subscription } from 'rxjs';
import { GenageService } from 'src/store/genage/genage.service';
@Component({
  selector: 'genage-detail',
  templateUrl: './genage-detail.component.html',
  styleUrls: ['./genage-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class GenageDetailComponent implements OnInit, OnDestroy {
  displayedColumns: string[];
  dataSource = new MatTableDataSource();
  expandedElement;
  subscription = new Subscription();

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private genageService: GenageService
  ) { }

  ngOnInit(): void {
    this.subscription.add(this.genageService.infection$.subscribe(x => {
      let dataSource = [];
      for(let source of x.items) {
        let exist = dataSource.find(t => t?.gubun === source?.gubun);

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
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
