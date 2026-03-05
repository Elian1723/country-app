import { Component } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { List } from "../../components/list/list";

@Component({
  selector: 'app-by-capital',
  imports: [SearchInput, List],
  templateUrl: './by-capital.html',
})
export class ByCapital {
  protected onSearch(value: string): void {
    console.log(value);
  }
}
