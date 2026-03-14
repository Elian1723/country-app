import { computed, Injectable, linkedSignal, signal } from '@angular/core';
import { Country } from '../interfaces/country';

const getCountriesSaved = (): Country[] => {
  const countries = localStorage.getItem("favorites-countries");

  if (countries) {
    return JSON.parse(countries) ?? [];
  }

  return []
}

@Injectable({
  providedIn: 'root'
})
export class CountryFavorite {
  private favoritesCountriesStorage = signal<Country[]>(getCountriesSaved());
  public favoritesCountries = linkedSignal<Country[]>(() => this.favoritesCountriesStorage());

  public exists(id: string): boolean {
    return this.favoritesCountriesStorage().some(c => c.cca2 == id);
  }

  public save(country: Country): void {
    if (!this.exists(country.cca2)) {
      this.favoritesCountriesStorage.update(f => [...f, country]);

      localStorage.setItem("favorites-countries", JSON.stringify(this.favoritesCountriesStorage()));
    }
  }

  public remove(country: Country): void {
    if (this.exists(country.cca2)) {
      this.favoritesCountriesStorage.update(f => f.filter(c => c.cca2 !== country.cca2));

      localStorage.setItem("favorites-countries", JSON.stringify(this.favoritesCountriesStorage()));
    }
  }
}
