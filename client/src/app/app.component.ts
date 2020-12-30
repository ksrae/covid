import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngcovid';
  urls;

  constructor(
    private router: Router,
    private translateService: TranslateService
  ) {

  }
  ngOnInit() {
    this.urls = ['today', 'national', 'city', 'genage'];
    this.translateService.use('ko');
  }

  isActive(url: string) {
    let routerUrl = this.router.url !== '/' ? this.router.url : this.urls[0];
    // console.log(url, routerUrl);
    return routerUrl.includes(url);
  }
}
