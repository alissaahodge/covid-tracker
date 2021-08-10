import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GlobalModel} from './model/global.model';
import { ChartType } from "angular-google-charts";
import {ApiService} from './api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class AppComponent implements OnInit {
  title: string = 'frontend';

  global: boolean = false;
  country: string = '';
  data: GlobalModel;
  dailyData: any[] = [];
  countries: any[] = [];
  lineChartData: any[] = [
    {
      data: [65, 64, 33, 44], label: 'Temp label'
    }
  ];
  lineChartType= 'line';
  lineChartLabels: any[] = [
    'Label01', 'Label01', 'Label03'
  ];
  barChartType = 'bar';
  barChartLabels: any[] = [
    'Infected', 'Recovered', 'Deaths'
  ];
  barChartData: any[] = [
    {data: [65, 76, 33], label: 'Label'}
  ];


  constructor(private api: ApiService) {
    this.data = new GlobalModel();
  }

  // on initialization of app component
  ngOnInit(): void {
    this.global = true;
    this.fetchData();
    this.fetchCountries();
    this.fetchDailyData();
  }

  fetchData() {
    this.api.fetchData().subscribe((res: any) => {
      this.data.confirmed = res['confirmed']['value'];
      this.data.recovered = res['recovered']['value'];
      this.data.deaths = res['deaths']['value'];
      this.data.lastupdate = res['lastUpdate'];
    });
  }

  fetchCountries() {
    this.api.fetchCountries().subscribe((res) => {
      let countries = res['countries'];
      this.countries = countries.map((name:any) => name['name']);
    });
  }

  fetchDataByCountry(country: string) {
    this.api.fetchDataByCountry(country).subscribe((res: any) => {
      this.data.confirmed = res['confirmed']['value'];
      this.data.recovered = res['recovered']['value'];
      this.data.deaths = res['deaths']['value'];
      this.data.lastupdate = res['lastUpdate'];

      this.barChartData = [
        {
          data: [this.data.confirmed, this.data.recovered, this.data.deaths],
          label: 'People'
        }
      ];
    });
  }

  fetchDailyData() {
    this.api.fetchDailyData().subscribe((res: any[]) => {
      this.lineChartLabels = res.map((date) => date['reportDate']);
      let infectedData = res.map((confirmed) => confirmed['totalConfirmed']);
      let deaths = res.map((deaths) => deaths['deaths']['total']);
      let recovered = res.map((rev) => rev);

      this.lineChartData = [
        {
          data: infectedData,
          label: 'Infected'
        },
        {
          data: deaths,
          label: 'Deaths'
        }
      ];
    });
  }

  countryChanged(value: string) {
    this.country = value;
    if (value == 'global') {
      this.fetchData();
      this.global = true;
    } else {
      this.fetchDataByCountry(value);
      this.global = false;
    }
  }
}
