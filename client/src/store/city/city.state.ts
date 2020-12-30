import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ICity, CityModel } from './city.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export class SetCity {
  static readonly type = '[City] Set City';
  constructor(public items: CityModel[]) {}
}

@State<ICity>({
  name: 'city',
  defaults: {
    header: ['gubun',  'defCnt', 'localOccCnt', 'overFlowCnt', 'isolIngCnt', 'isolClearCnt', 'incDec', 'qurRate', 'createDt'],
    items: []
  }
})
export class CityState {
  @Action(SetCity)
  setCityData(ctx: StateContext<ICity>, payload: ICity) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      items: payload.items
    });
  }
}
