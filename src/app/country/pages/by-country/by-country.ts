import { Component, inject, linkedSignal, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { List } from "../../components/list/list";
import { CountryApi } from '../../services/countryApi';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country',
  imports: [SearchInput, List],
  templateUrl: './by-country.html',
})
export class ByCountry {
  private countryApi = inject(CountryApi);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  protected queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  protected query = linkedSignal(() => this.queryParam);

  protected countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);

      this.router.navigate(["/country/by-country"], {
        queryParams: {
          query: params.query
        }
      })
      return this.countryApi.searchByCountry(params.query);
    }
  });
}
