import { Component, Input } from '@angular/core';
import { Country } from 'app/countries/interfaces';

@Component({
  selector: 'countries-country-table',
  templateUrl: './country-table.component.html',
  styleUrl: './country-table.component.css',
})
export class CountryTableComponent {
  @Input()
  countries: Country[] = [];

  @Input()
  alertMessage?: string;
}
