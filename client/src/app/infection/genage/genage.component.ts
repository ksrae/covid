import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-genage',
  templateUrl: './genage.component.html',
  styleUrls: ['./genage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenageComponent implements OnInit {
  infectionData$;

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.infectionData$ = this.httpService.getGenAge();
  }

}
