import { Component, computed, input } from '@angular/core';
import { Country } from '../../../interfaces/country';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-information',
  imports: [DecimalPipe],
  templateUrl: './country-information.html',
})
export class CountryInformation {
  public country = input.required<Country>();

  protected currentYear = computed(() => new Date().getFullYear());
}
