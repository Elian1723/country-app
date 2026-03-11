import { Component, inject, linkedSignal } from '@angular/core';
import { List } from "../../components/list/list";
import { Region } from '../../interfaces/region';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryApi } from '../../services/countryApi';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParams(queryParam: string): Region | null {
  queryParam = queryParam.toLocaleLowerCase();

  const validRegions: Record<string, Region> = {
    'africa' : 'Africa',
    'americas': 'Americas',
    'asia': 'Asia',
    'europe': 'Europe',
    'oceania': 'Oceania',
    'antarctic': 'Antarctic'
  }

  return validRegions[queryParam] ?? null;
}

@Component({
  selector: 'app-by-region',
  imports: [List],
  templateUrl: './by-region.html',
})
export class ByRegion {
  private countryApi = inject(CountryApi);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  protected regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  protected queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';
  protected selectedRegion = linkedSignal<Region|null>(() => validateQueryParams(this.queryParam));

  protected countryResource = rxResource({
    params: () => ({query: this.selectedRegion()}),
    stream: ({params}) => {
      if (!params.query) return of([]);

      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: params.query
        }
      })

      return this.countryApi.searchByRegion(params.query);
    }
  })
}
