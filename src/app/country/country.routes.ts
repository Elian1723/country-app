import { Routes } from '@angular/router';
import { CountryLayout } from './layouts/countryLayout/countryLayout';
import { ByCapital } from './pages/by-capital/by-capital';
import { ByCountry } from './pages/by-country/by-country';
import { ByRegion } from './pages/by-region/by-region';
import { ByCode } from './pages/by-code/by-code';
import { Favorites } from './pages/favorites/favorites';

export const routes: Routes = [
  {
    path: '',
    component: CountryLayout,
    children: [
      {
        path: 'by-capital',
        component: ByCapital
      },
      {
        path: 'by-country',
        component: ByCountry
      },
      {
        path: 'by-region',
        component: ByRegion
      },
      {
        path: 'by/:code',
        component: ByCode
      },
      {
        path: 'favorites',
        component: Favorites
      },
      {
        path: '**',
        redirectTo: 'by-capital'
      }
    ]
  }
];

export default routes;
