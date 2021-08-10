import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  baseUrl = 'https://covid19.mathdro.id/api';

  constructor(private http: HttpClient) {
  }

  fetchData(): Observable<any> {
    return this.http.get(this.baseUrl)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  fetchDataByCountry(country: string): Observable<any> {
    return this.http.get(this.baseUrl + '/countries/' + country)
      .pipe(
        map(data => {
          return data;
        })
      );
  }


  fetchDailyData(): Observable<any> {
    return this.http.get(this.baseUrl + '/daily')
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  fetchCountries(): Observable<any> {
    return this.http.get(this.baseUrl + '/countries')
      .pipe(
        map(data => {
          return data;
        })
      );
  }

}
