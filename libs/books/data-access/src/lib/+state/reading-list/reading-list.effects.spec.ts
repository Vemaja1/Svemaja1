import { TestBed } from '@angular/core/testing';
import { ReplaySubject, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpTestingController } from '@angular/common/http/testing';

import { SharedTestingModule, createReadingListItem } from '@tmo/shared/testing';
import { ReadingListEffects } from './reading-list.effects';
import * as ReadingListActions from './reading-list.actions';

describe('ToReadEffects', () => {
  let actions: ReplaySubject<any>;
  let effects: ReadingListEffects;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      providers: [
        ReadingListEffects,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(ReadingListEffects);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('loadReadingList$', () => {
    it('should work', done => {
      actions = new ReplaySubject();
      actions.next(ReadingListActions.init());

      effects.loadReadingList$.subscribe(action => {
        expect(action).toEqual(
          ReadingListActions.loadReadingListSuccess({ list: [] })
        );
        done();
      });

      httpMock.expectOne('/api/reading-list').flush([]);
    });
  });

  describe('markBookAsFinish$', () => {
    it('should mark book as finished', (done) => {
      const item = createReadingListItem('B');
      actions = new ReplaySubject();
      actions.next(ReadingListActions.markReadingBookAsFinished({ item }));

      effects.markBookAsFinish$.subscribe((action) => {
        expect(action).toEqual(
            ReadingListActions.confirmedMarkBookAsFinished({ item })
        );
        done();
      });

      httpMock
          .expectOne(`/api/reading-list/${item.bookId}/finished`)
          .flush(item);
    });

    it('should return failedMarkBookAsFinished with readingItem marked as finished, on fail', (done) => {
      const item = createReadingListItem('B');
      actions = new ReplaySubject();
      actions.next(ReadingListActions.markReadingBookAsFinished({ item }));

      effects.markBookAsFinish$.subscribe((action) => {
        expect(action).toEqual(
            ReadingListActions.failedMarkBookAsFinished({ item })
        );
        done();
      });
      httpMock
          .expectOne(`/api/reading-list/${item.bookId}/finished`)
          .flush(item, {
            status: 400,
            statusText: 'Cannot mark Reading Item as Finished',
          });
    });
  });
});
