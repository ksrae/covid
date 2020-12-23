import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private http: HttpClient
  ) {

  }
  getInfection() {
    return this.requestData('infection');
  }
  getNational() {
    return this.requestData('nationalInfection');
  }
  getCity() {
    return this.requestData('cityInfection');
  }
  getGenAge() {
    return this.requestData('genInfection');
  }

  private requestData(url: string) {
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    return this.http.get(`${environment.common.server}${url}`, {
      headers: header
    }).pipe(
      map((result: any[]) => {
        if(result && result.length) {
          for(let data of result) {
            for(let item in data) {
              data[item] = data[item]['_text'];
            }
          }
        }

        return result;
      })
    );
  }
}
