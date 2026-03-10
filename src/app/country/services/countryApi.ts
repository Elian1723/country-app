import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryApi {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();

  public searchByCapital(query: string): Observable<Country[]> {
    query = query.trim().toLowerCase();

    if (this.queryCacheCapital.has(query)){
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        delay(3000),
        map(CountryMapper.mapRestCountryArrayToCountryArray),
        tap(countries => this.queryCacheCapital.set(query, countries)),
        catchError(error => {
          console.error('Error fetching countries by capital:', error);

          return throwError(
            () => new Error('Not found any country with that capital')
          );
        })
      );
  }

  public searchByCountry(query: string): Observable<Country[]> {
    query = query.trim().toLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    console.log(`Consulting server for ${query}`);

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        map(CountryMapper.mapRestCountryArrayToCountryArray),
        tap(countries => this.queryCacheCountry.set(query, countries)),
        catchError(error => {
          console.error('Error fetching countries by country name:', error);

          return throwError(
            () => new Error('Not found any country with that name')
          );
        })
      );
  }

  public searchCountryByAlphaCode(code: string): Observable<Country | null> {
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code.trim()}`)
      .pipe(
        map(CountryMapper.mapRestCountryArrayToCountryArray),
        map(countries => countries.at(0) ?? null),
        catchError(error => {
          console.error('Error fetching country by alpha code:', error);

          return throwError(
            () => new Error('Not found any country with that code')
          );
        })
      );
  }
}
