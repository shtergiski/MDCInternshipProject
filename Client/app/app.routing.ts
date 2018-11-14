import { Routes } from '@angular/router';
import { LibraryComponent } from './Library/library.component';
import { BookComponent } from './Book/book.component';
import { PublisherComponent } from './Publishers/publisher.component';
import { BookCopiesComponent } from './BookCopies/bookCopies.component';
import { ClientComponent } from './Clients/client.component';
import { LendingComponent } from './Lendings/lending.component';
import { LendingEditComponent } from './Lendings/Edit/edit.component';
import { LibraryEditComponent } from './Library/Edit/edit.component';
import { PublisherEditComponent } from './Publishers/Edit/edit.component';
import { ClientEditComponent } from './Clients/Edit/edit.component';
import { BookCopiesEditComponent } from './BookCopies/Edit/edit.component';
import { BookEditComponent } from './Book/Edit/edit.component';


export const routes: Routes = [
    { path: '', component: LibraryComponent },
    { path: 'library', component: LibraryComponent },
    { path: 'publishers', component: PublisherComponent },
    { path: 'book', component: BookComponent },
    { path: 'bookCopies', component: BookCopiesComponent },
    { path: 'client', component: ClientComponent },
    { path: 'lending', component: LendingComponent },
    { path: 'lending/add', component: LendingEditComponent },
    { path: 'lending/edit/:id', component: LendingEditComponent },
    { path: 'library/add', component: LibraryEditComponent },
    { path: 'library/edit/:id', component: LibraryEditComponent },
    { path: 'publishers/add', component: PublisherEditComponent },
    { path: 'publishers/edit/:id', component: PublisherEditComponent },
    { path: 'client/add', component: ClientEditComponent },
    { path: 'client/edit/:id', component: ClientEditComponent },
    { path: 'bookCopies/add', component: BookCopiesEditComponent },
    { path: 'bookCopies/edit/:id', component: BookCopiesEditComponent },
    { path: 'book/add', component: BookEditComponent },
    { path: 'book/edit/:id', component: BookEditComponent },
  
] 