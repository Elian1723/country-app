import { CountryInformation } from './country-information/country-information';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryApi } from '../../services/countryApi';
import { NotFound } from "../../../shared/components/not-found/not-found";

@Component({
  selector: 'app-by-code',
  imports: [NotFound, CountryInformation],
  templateUrl: './by-code.html',
})
export class ByCode {
  protected countryCode = inject(ActivatedRoute).snapshot.params['code'];
  protected countryApi = inject(CountryApi);

  countryResource = rxResource({
    params: () => ({code: this.countryCode}),
    stream: ({ params }) => {
      return this.countryApi.searchCountryByAlphaCode(params.code);
    }
  });

}
