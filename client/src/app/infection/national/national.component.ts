import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-national',
  templateUrl: './national.component.html',
  styleUrls: ['./national.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NationalComponent implements OnInit {
  infectionData$;
  header;

  constructor(
    private httpService: HttpService
  ) { }

  // {
  //   "areaNm": "기타",
  //   "areaNmCn": "其他",
  //   "areaNmEn": "Others",
  //   "createDt": "2020-11-29 10:36:05.896",
  //   "natDeathCnt": "2605",
  //   "natDeathRate": "1.1917669718",
  //   "natDefCnt": "218583",
  //   "nationNm": "기타지역 영토",
  //   "nationNmCn": "Others",
  //   "nationNmEn": "Others",
  //   "seq": "60813",
  //   "stdDay": "2020년 11월 29일 09시",
  //   "updateDt": "null"
  // }

  ngOnInit(): void {
    this.header = ['areaNm',  'nationNm', 'natDeathCnt', 'natDeathRate', 'natDefCnt', 'createDt'];
    this.infectionData$ = this.httpService.getNational().pipe(
      map(data => {
        return data.sort((a,b) => {
          if(a['nationNm'] < b['nationNm']) {
            return -1;
          } else if(a['nationNm'] > b['nationNm']) {
            return 1;
          } else {
            return 0;
          }
        })
      }),
    );
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
