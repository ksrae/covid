import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  currentDate = `${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}`;
  weekago = new Date(new Date().setDate(new Date().getDate() - 7));
  previousDate = `${this.weekago.getFullYear()}${this.weekago.getMonth()}${this.weekago.getDate()}`;

  constructor(
    private http: HttpClient
  ) {

  }
  getToday() {
    return this.requestData('todayInfection', this.currentDate, this.previousDate);
  }
  getNational(nation: string = '') {
    let result = this.requestData('nationalInfection', this.currentDate, nation ? this.previousDate : this.currentDate);
    if(nation) {
      return result.pipe(
        map(data => data.filter(x => x.nationNmEn == nation))
      );
    } else {
      return result;
    }
  }
  getCity() {
    return this.requestData('cityInfection', this.currentDate, this.previousDate);
  }
  getGenAge() {
    return this.requestData('genInfection', this.currentDate, this.previousDate);
  }

  private requestData(url: string, currentDate: any, previousDate: any) {
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    let params = new HttpParams().append('currentDate', currentDate).append('previousDate', previousDate);

    return this.http.get(`${environment.common.server}${url}`, {
      headers: header,
      params: params
    })
    .pipe(
      map((result: any[]) => result)
    )
    ;
  }
}
