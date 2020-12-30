
import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { HttpService } from 'src/services/http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Select } from '@ngxs/store';
import { INational } from './national.model';
import { SetNational, NationalState } from './national.state';

@Injectable({
  providedIn: 'root'
})
export class NationalService {
  constructor(
    private httpService:HttpService
  ) {

  }

  @Select(NationalState)
  public infection$: Observable<INational>;

  @Dispatch()
  public set() {
    return this.httpService.getNational().pipe(
      map(data => {
        return new SetNational(data.sort((a,b) => {
          if(a['nationNm'] < b['nationNm']) {
            return -1;
          } else if(a['nationNm'] > b['nationNm']) {
            return 1;
          } else {
            return 0;
          }
        }))
      })
    );
  }
}
