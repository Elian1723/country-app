import { Component, inject, resource, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { List } from "../../components/list/list";
import { CountryApi } from '../../services/countryApi';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-capital',
  imports: [SearchInput, List],
  templateUrl: './by-capital.html',
})
export class ByCapital {
  private countryApi = inject(CountryApi);
  protected query = signal('');

  protected countryResource = resource({
    params: () => ({ query: this.query() }),
    loader: async ({ params }) => {
      if (!params.query) return [];

      return await firstValueFrom(this.countryApi.searchByCapital(params.query));
    }
  });
}
