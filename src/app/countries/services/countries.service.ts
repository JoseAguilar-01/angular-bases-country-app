import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { API_HOST } from '@utils/constants';
import {
  Country,
  Region,
  CacheStore,
  GetHTTPRequestParams,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  cacheStore: CacheStore = {
    byCapital: {
      term: '',
      countries: [],
    },
    byCountry: {
      term: '',
      countries: [],
    },
    byRegion: {
      countries: [],
    },
  };

  constructor(private http: HttpClient) {
    this.getOfLocalStorage();
  }

  private saveInLocalStorage() {
    localStorage.setItem('cache-store', JSON.stringify(this.cacheStore));
  }

  private getOfLocalStorage() {
    if (!localStorage.getItem('cache-store')) return;

    this.cacheStore = JSON.parse(
      localStorage.getItem('cache-store')!
    ) as CacheStore;
  }

  private getHTTPRequest<T>(params: GetHTTPRequestParams<T>): Observable<T> {
    const { defaultValue, keyword, urlKey } = params;

    return this.http.get<T>(`${API_HOST}/${urlKey}/${keyword}`).pipe(
      delay(1000),
      catchError((error) => {
        console.log('🚀 ~ CountriesService ~ getHTTPRequest ~ error:', error);

        return of(defaultValue);
      })
    );
  }

  searchByCapital(term: string) {
    return this.getHTTPRequest<Country[]>({
      urlKey: 'capital',
      keyword: term,
      defaultValue: [],
    }).pipe(
      tap((countries) => {
        this.cacheStore.byCapital = { term, countries };
        this.saveInLocalStorage();
      })
    );
  }

  searchByCountry(term: string) {
    return this.getHTTPRequest<Country[]>({
      urlKey: 'name',
      keyword: term,
      defaultValue: [],
    }).pipe(
      tap((countries) => {
        this.cacheStore.byCountry = { term, countries };
        this.saveInLocalStorage();
      })
    );
  }

  searchByRegion(term: Region) {
    return this.getHTTPRequest<Country[]>({
      urlKey: 'region',
      keyword: term,
      defaultValue: [],
    }).pipe(
      tap((countries) => {
        this.cacheStore.byRegion = { term, countries };
        this.saveInLocalStorage();
      })
    );
  }

  searchByCode(code: string): Observable<Country | undefined> {
    return this.getHTTPRequest<Country[] | undefined>({
      urlKey: 'capital',
      keyword: code,
      defaultValue: undefined,
    }).pipe(map((countries) => countries?.[0]));
  }
}
