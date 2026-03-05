import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "../../../shared/pages/home/home";
import { TopMenu } from "../../components/top-menu/top-menu";

@Component({
  selector: 'app-country-layout',
  imports: [RouterOutlet, TopMenu],
  templateUrl: './countryLayout.html',
})
export class CountryLayout {

}
