import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getTotalUnread } from '@tmo/books/data-access';

@Component({
  selector: 'tmo-total-count',
  templateUrl: './total-count.component.html'
})
export class TotalCountComponent {
  totalUnread$ = this.store.select(getTotalUnread);

  constructor(private readonly store: Store) {}

}
