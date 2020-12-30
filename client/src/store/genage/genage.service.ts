import { SetGenage, GenageState } from './genage.state';
import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { HttpService } from 'src/services/http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Select } from '@ngxs/store';
import { IGenage } from './genage.model';
@Injectable({
  providedIn: 'root'
})
export class GenageService {
  constructor(
    private httpService:HttpService
  ) {

  }

  @Select(GenageState)
  public infection$: Observable<IGenage>;

  @Dispatch()
  public set() {
    return this.httpService.getGenAge().pipe(
      map(data => {
        return new SetGenage(data.sort((a,b) => {
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
