
import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { HttpService } from 'src/services/http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Select } from '@ngxs/store';
import { ICity, CityModel } from './city.model';
import { SetCity, CityState } from './city.state';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  constructor(
    private httpService:HttpService
  ) {

  }

  @Select(CityState)
  public infection$: Observable<ICity>;

  @Dispatch()
  public set() {
    return this.httpService.getCity().pipe(
      map(data => {
        return new SetCity(data.sort((a,b) => {
          if(a['seq'] > b['seq']) {
            return -1;
          } else if(a['seq'] < b['seq']) {
            return 1;
          } else {
            return 0;
          }
        })as CityModel[])
      })
    );
  }
}
