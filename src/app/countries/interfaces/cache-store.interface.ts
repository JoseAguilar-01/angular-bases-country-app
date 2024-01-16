import { Country, Region } from './country.interface';

export interface CacheStore {
  byCapital: CachedData;
  byCountry: CachedData;
  byRegion: CachedData<Region>;
}

interface CachedData<T = string> {
  countries: Country[];
  term?: T;
}
