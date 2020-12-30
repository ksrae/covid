import { Action, Selector, State, StateContext } from '@ngxs/store';
import { TodayModel, IToday } from './today.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export class SetToday {
  static readonly type = '[Today] Set Today';
  constructor(public items: TodayModel[]) {}
}

@State<IToday>({
  name: 'today',
  defaults: {
    header: ['accDefRate', 'accExamCnt', 'accExamCompCnt', 'careCnt', 'clearCnt', 'deathCnt', 'decideCnt', 'examCnt', 'resutlNegCnt', 'createDt'],
    items: []
  }
})
export class TodayState {
  @Action(SetToday)
  setTodayData(ctx: StateContext<IToday>, payload: IToday) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      items: payload.items
    });
  }
}
