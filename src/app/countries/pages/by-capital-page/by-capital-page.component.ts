import { Component, OnInit } from '@angular/core';
import { Country } from 'app/countries/interfaces';
import { CountriesService } from 'app/countries/services/countries.service';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: `
    :host {
      display: block
    }
  `,
})
export class ByCapitalPageComponent implements OnInit {
  countries: Country[] = [];
  isLoading = false;
  enableLoader = false;

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
  }

  get searchTerm() {
    return this.countriesService.cacheStore.byCapital.term ?? '';
  }

  onSearch(term: string) {
    if (!this.enableLoader) {
      this.enableLoader = true;
    }

    this.isLoading = true;

    this.countriesService.searchByCapital(term).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
