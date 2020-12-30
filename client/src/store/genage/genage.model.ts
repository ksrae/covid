export interface IGenage {
  header: string[];
  items: GenageModel[];
}
export interface GenageModel {
  confCase: number;
  confCaseRate: number;
  criticalRate: number;
  death: number;
  deathRate: number;
  gubun: string;
  createDt: number;
}
