import { Component, OnInit } from '@angular/core';
import { Country } from 'app/countries/interfaces';
import { CountriesService } from 'app/countries/services/countries.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``,
})
export class ByCountryPageComponent implements OnInit {
  countries: Country[] = [];
  isLoading = false;
  enableLoader = false;

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountry.countries;
  }

  get searchTerm() {
    return this.countriesService.cacheStore.byCountry.term ?? '';
  }

  onSearch(term: string) {
    if (!this.enableLoader) {
      this.enableLoader = true;
    }

    this.isLoading = true;

    this.countriesService.searchByCountry(term).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
