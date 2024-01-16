import { Component, OnInit } from '@angular/core';
import { Country, Region } from 'app/countries/interfaces';
import { CountriesService } from 'app/countries/services/countries.service';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``,
})
export class ByRegionPageComponent implements OnInit {
  countries: Country[] = [];
  regions: Region[] = [
    'Americas',
    'Asia',
    'Africa',
    'Oceania',
    'Europe',
    'Antarctic',
  ];
  isLoading = false;
  enableLoader = false;
  selectedRegion?: Region;

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    const { term, countries } = this.countriesService.cacheStore.byRegion;

    this.countries = countries;
    this.selectedRegion = term;
  }

  onSearch(term: Region) {
    if (!this.enableLoader) {
      this.enableLoader = true;
    }

    this.isLoading = true;
    this.selectedRegion = term;

    this.countriesService.searchByRegion(term).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
