export interface ICity {
  header: string[];
  items: CityModel[];
}
export interface CityModel {
  createDt: string;
  deathCnt: number;
  gubun: string;
  incDec: number;
  isolClearCnt: number;
  isolIngCnt: number;
  localOccCnt: number;
  overFlowCnt: number;
  qurRate: number | string;
  defCnt: number;
}
