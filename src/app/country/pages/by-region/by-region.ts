import { Component, signal } from '@angular/core';
import { List } from "../../components/list/list";
import { Region } from '../../interfaces/region';

@Component({
  selector: 'app-by-region',
  imports: [List],
  templateUrl: './by-region.html',
})
export class ByRegion {
  protected regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  protected selectedRegion = signal<Region|null>(null);

  protected selectRegion(region: Region): void {
    this.selectedRegion.set(region)
  }


}
