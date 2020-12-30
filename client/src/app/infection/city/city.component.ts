import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CityService } from 'src/store/city/city.service';
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CityComponent implements OnInit {
  data$ = this.cityService.infection$;

  constructor(
    private cityService: CityService
  ) { }

  ngOnInit(): void {
    this.cityService.set();
    this.data$.subscribe(x => console.log(x));
  }
  onSelect(e) {
    console.log('onSelect', e);
  }
  onActivate(e) {
    console.log('onActivate', e);
  }
  onDeactivate(e) {
    console.log('onDeactivate', e);
  }
}
