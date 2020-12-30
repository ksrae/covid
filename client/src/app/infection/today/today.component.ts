import { Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { HttpService } from 'src/services/http.service';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodayComponent implements OnInit {
  infectionData$;
  header;
  // view: any[] = [700, 300];
  // sample;
  // // options
  // legend: boolean = true;
  // showLabels: boolean = true;
  // animations: boolean = true;
  // xAxis: boolean = true;
  // yAxis: boolean = true;
  // showYAxisLabel: boolean = true;
  // showXAxisLabel: boolean = true;
  // xAxisLabel: string = 'Year';
  // yAxisLabel: string = 'Population';
  // timeline: boolean = true;
  // colorScheme = colorSets['natural'];

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.header = ['accDefRate', 'accExamCnt', 'accExamCompCnt', 'careCnt', 'clearCnt', 'deathCnt', 'decideCnt', 'examCnt', 'resutlNegCnt', 'createDt'];
    this.infectionData$ = this.httpService.getToday().pipe(
      map(data => {
        return data.sort((a,b) => {
          if(a['seq'] > b['seq']) {
            return -1;
          } else if(a['seq'] < b['seq']) {
            return 1;
          } else {
            return 0;
          }
        })
      })
      // map(data => {

      //   return data;
      // })
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

// {
//   "accDefRate": "1.1334581263", // 누적환진률
//   "accExamCnt": "3046971", // 누적검사수
//   "accExamCompCnt": "2984142", // 누적검사완료수
//   "careCnt": "5759", // 치료중 환자수
//   "clearCnt": "27542", //격리해제수
//   "createDt": "2020-11-29 09:33:56.021", //등록일시
//   "deathCnt": "523", //사망자 수
//   "decideCnt": "33824", //확진자수
//   "examCnt": "62829", //검사진행수
//   "resutlNegCnt": "2950318", //결과음성수
//   "seq": "337", //게시글번호
//   "stateDt": "20201129", //일자
//   "stateTime": "00:00",
//   "updateDt": "null"
// }

    // this.sample = [
    //   {
    //     "name": "Germany",
    //     "series": [
    //       {
    //         "name": "1990",
    //         "value": 62000000
    //       },
    //       {
    //         "name": "2010",
    //         "value": 73000000
    //       },
    //       {
    //         "name": "2011",
    //         "value": 89400000
    //       }
    //     ]
    //   },

    //   {
    //     "name": "USA",
    //     "series": [
    //       {
    //         "name": "1990",
    //         "value": 250000000
    //       },
    //       {
    //         "name": "2010",
    //         "value": 309000000
    //       },
    //       {
    //         "name": "2011",
    //         "value": 311000000
    //       }
    //     ]
    //   }
    // ];
