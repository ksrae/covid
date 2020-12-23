import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-national',
  templateUrl: './national.component.html',
  styleUrls: ['./national.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NationalComponent implements OnInit {
  infectionData$;

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.infectionData$ = this.httpService.getNational();
  }

}
