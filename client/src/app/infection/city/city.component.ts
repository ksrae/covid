import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CityComponent implements OnInit {
  infectionData$;

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.infectionData$ = this.httpService.getCity();
  }

}
