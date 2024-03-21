import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';

import { ReadingListItem } from '@tmo/shared/models';
import { createReadingListItem, SharedTestingModule} from '@tmo/shared/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { MemoizedSelector } from '@ngrx/store';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let mockStore: MockStore;
  let mockReadingListSelector: MemoizedSelector<ReadingListItem, any>;
  const initialState = { entities: {}, ids: [], loaded: false };
  const readingList: ReadingListItem = createReadingListItem('1');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule, BrowserAnimationsModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    mockReadingListSelector = mockStore.overrideSelector(getReadingList, []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trackByReadinglist method return unique id', () => {
    expect(component.trackByReadinglist(1, {bookId: '1'} as ReadingListItem)).toEqual('1');
  })

  it('should call remove from reading list action with correct reading book', () => {
    const item = createReadingListItem('A');
    const expectedAction = removeFromReadingList({ item });
    spyOn(mockStore, 'dispatch').and.callThrough();
    component.removeFromReadingList(item);
    fixture.detectChanges();
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
