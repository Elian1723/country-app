import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries';
import { catchError, map, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryApi {
  private http = inject(HttpClient);

  public searchByCapital(query: string) {
    query = query.trim().toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map(CountryMapper.mapRestCountryArrayToCountryArray),
        catchError(error => {
          console.error('Error fetching countries by capital:', error);

          return throwError(
            () => new Error('Not found any country with that capital')
          );
        })
      );
  }

  public searchByCountry(query: string) {
    query = query.trim().toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        map(CountryMapper.mapRestCountryArrayToCountryArray),
        catchError(error => {
          console.error('Error fetching countries by country name:', error);

          return throwError(
            () => new Error('Not found any country with that name')
          );
        })
      );
  }
}
