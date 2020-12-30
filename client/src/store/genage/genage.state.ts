import { Action, Selector, State, StateContext } from '@ngxs/store';
import { GenageModel, IGenage } from './genage.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export class SetGenage {
  static readonly type = '[Genage] Set Genage';
  constructor(public items: GenageModel[]) {}
}

@State<IGenage>({
  name: 'genage',
  defaults: {
    header: ['gubun', 'confCase', 'confCaseRate', 'criticalRate', 'death', 'deathRate', 'createDt'],
    items: []
  }
})
export class GenageState {
  @Action(SetGenage)
  setGenageData(ctx: StateContext<IGenage>, payload: IGenage) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      items: payload.items
    });
  }
}
