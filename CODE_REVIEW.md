# Code smells and Improvements
- In `book-search.component.spec.ts` the `ProductsListComponent` should be replaced with `BookSearchComponent`. - Fixed
- Empty `ngOninit()` method can be removed in `total-count.component.ts` - Fixed
- delete `total-count.component.scss` as it is empty file - Fixed
- All books and reading-list state related files should be regrouped to its own folder for better code structuring/readability(Inside api/books/data-access) - Fixed
- methods for `failedAddToReadingList` and `failedRemoveFromReadingList` actions is missing on reducers - Added
- Missing unit tests for book-search component and reading-list component. - Added

# User Experience Improvement
- No Progress spinner when Search Book API is in progress.
- When user search with text for which API is returning empty/error response is not handled (Edge case scenarios handler is missing on UI)
- Application is not compatabile and UI broken for small devices

# Accessibility Issue with LightHouse
- Buttons do not have an accessible name - Resolved
- Background and foreground colors do not have a sufficient contrast ratio.

#  Manual accessiblity issues identified
- The anchor tag for "Javascript" on landing page is not working when user try with keyboard ENTER key - Resolved