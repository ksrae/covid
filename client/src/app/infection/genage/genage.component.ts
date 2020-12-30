import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GenageService } from 'src/store/genage/genage.service';

@Component({
  selector: 'app-genage',
  templateUrl: './genage.component.html',
  styleUrls: ['./genage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenageComponent implements OnInit {
  data$ = this.genageService.infection$;

  constructor(
    private genageService: GenageService
  ) { }

  ngOnInit(): void {
    this.genageService.set();
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
