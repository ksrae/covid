import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NationalService } from 'src/store/national/national.service';

@Component({
  selector: 'app-national',
  templateUrl: './national.component.html',
  styleUrls: ['./national.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NationalComponent implements OnInit {
  data$ = this.nationalService.infection$;

  constructor(
    private nationalService: NationalService
  ) { }

  ngOnInit(): void {
    this.nationalService.set();
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
