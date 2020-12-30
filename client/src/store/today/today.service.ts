import { SetToday, TodayState } from './today.state';
import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { HttpService } from 'src/services/http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Select } from '@ngxs/store';
import { IToday } from './today.model';
@Injectable({
  providedIn: 'root'
})
export class TodayService {
  constructor(
    private httpService:HttpService
  ) {

  }

  @Select(TodayState)
  public infection$: Observable<IToday>;

  @Dispatch()
  public set() {
    return this.httpService.getToday().pipe(
      map(data => {
        return new SetToday(data.sort((a,b) => {
          if(a['seq'] > b['seq']) {
            return -1;
          } else if(a['seq'] < b['seq']) {
            return 1;
          } else {
            return 0;
          }
        }))
      })
    );
  }
}
