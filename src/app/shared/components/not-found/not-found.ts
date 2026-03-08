import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
})
export class NotFound {
  protected location = inject(Location);

  protected goBack() {
    this.location.back();
  }
}
