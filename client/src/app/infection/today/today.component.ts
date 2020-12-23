import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodayComponent implements OnInit {
  infectionData$;

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.infectionData$ = this.httpService.getCity();
  }

}
