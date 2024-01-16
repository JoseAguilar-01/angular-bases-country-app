import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Country } from 'app/countries/interfaces';
import { CountriesService } from 'app/countries/services/countries.service';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: ``,
})
export class CountryPageComponent implements OnInit {
  translationsKeys?: string[];
  country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap((params) =>
          this.countriesService.searchByCode(params['code'])
        )
      )
      .subscribe((country) => {
        if (!country) {
          return this.router.navigateByUrl('/countries');
        }

        this.country = country;
        this.translationsKeys = Object.keys(country.translations);
        return;
      });
  }
}
