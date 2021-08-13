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
    /**
     * fetches global stats
     *
     * @param none
     * @returns {Observable<any>}
     */
  fetchData(): Observable<any> {
    return this.http.get(this.baseUrl)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

   /**
     * fetches stats by country
     *
     * @param country
     * @returns {Observable<any>}
     */
  fetchDataByCountry(country: string): Observable<any> {
    return this.http.get(this.baseUrl + '/countries/' + country)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

 /**
     * fetches daily data
     *
     * @param none
     * @returns {Observable<any>}
     */
  fetchDailyData(): Observable<any> {
    return this.http.get(this.baseUrl + '/daily')
      .pipe(
        map(data => {
          return data;
        })
      );
  }

   /**
     * fetches countries
     *
     * @param none
     * @returns {Observable<any>}
     */
  fetchCountries(): Observable<any> {
    return this.http.get(this.baseUrl + '/countries')
      .pipe(
        map(data => {
          return data;
        })
      );
  }

}
