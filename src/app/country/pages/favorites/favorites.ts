import { Component, inject } from '@angular/core';
import { List } from "../../components/list/list";
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryFavorite } from '../../services/country-favorite';

@Component({
  selector: 'app-favorites',
  imports: [List],
  templateUrl: './favorites.html',
})
export class Favorites {
  protected countryFavorite = inject(CountryFavorite);
}
