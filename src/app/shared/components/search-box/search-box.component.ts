import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debounce = new Subject<string>();
  private debounceSubscription?: Subscription;

  @Input()
  placeholder: string = '';

  @Input()
  defaultValue: string = '';

  @Output()
  onSearch = new EventEmitter<string>();

  @Output()
  onDebounce = new EventEmitter<string>();

  ngOnInit() {
    this.debounceSubscription = this.debounce
      .pipe(debounceTime(400))
      .subscribe((value) => this.onDebounce.emit(value));
  }

  ngOnDestroy(): void {
    this.debounceSubscription?.unsubscribe();
  }

  emitSearch(term: string) {
    this.onSearch.emit(term);
  }

  emitDebounce(term: string) {
    this.debounce.next(term);
  }
}
