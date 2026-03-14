import { Component, inject, input } from '@angular/core';
import { Country } from '../../interfaces/country';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CountryFavorite } from '../../services/country-favorite';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './list.html',
})
export class List {
  private countryFavorite = inject(CountryFavorite);
  public countries = input.required<Country[]>();

  public errorMessage = input<string | unknown | null>();
  public isLoading = input<boolean>(false);
  public isEmpty = input<boolean>(false);

  protected addCountryToFavorites(index: number) {
    const country = this.countries().at(index);

    if (country) {
      country.isFavorite = true;
      this.countryFavorite.save(country);
    }
  }

  protected removeCountryFromFavorites(index: number) {
    const country = this.countries().at(index);

    if (country) {
      country.isFavorite = false;
      this.countryFavorite.remove(country);
    }
  }
}
