import { Action, Selector, State, StateContext } from '@ngxs/store';
import { INational, NationalModel } from './national.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export class SetNational {
  static readonly type = '[National] Set National';
  constructor(public items: NationalModel[]) {}
}

@State<INational>({
  name: 'national',
  defaults: {
    header: ['areaNm',  'nationNm', 'natDeathCnt', 'natDeathRate', 'natDefCnt', 'createDt'],
    items: []
  }
})
export class NationalState {
  @Action(SetNational)
  setNationalData(ctx: StateContext<INational>, payload: INational) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      items: payload.items
    });
  }
}
