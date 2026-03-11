import { Component, inject, linkedSignal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { List } from "../../components/list/list";
import { CountryApi } from '../../services/countryApi';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital',
  imports: [SearchInput, List],
  templateUrl: './by-capital.html',
})
export class ByCapital {
  private countryApi = inject(CountryApi);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router)

  protected queryParam: string = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  protected query = linkedSignal(() => this.queryParam);

  protected countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);

      this.router.navigate(["/country/by-capital"], {
        queryParams: {
          query: params.query
        }
      });

      return this.countryApi.searchByCapital(params.query);
    }
  });
}
