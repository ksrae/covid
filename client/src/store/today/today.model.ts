export interface IToday {
  header: string[];
  items: TodayModel[];
}
export interface TodayModel {
  accDefRate: number;
  accExamCnt: number;
  accExamCompCnt: number;
  careCnt: number;
  clearCnt: number;
  deathCnt: number;
  decideCnt: number;
  examCnt: number;
  resutlNegCnt: number;
  createDt: any;
}
