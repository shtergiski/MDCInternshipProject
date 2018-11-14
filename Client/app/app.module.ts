import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LibraryComponent } from './Library/library.component'
import { BookComponent } from './Book/book.component'
import { PublisherComponent } from './Publishers/publisher.component'
import { LibraryService } from './Services/Library/LibraryService';

import { routes } from './app.routing' 
import { BookService } from './Services/Book/BookService';
import { PublisherService } from './Services/Publisher/PublisherService';
import { BookCopiesService } from './Services/BookCopies/BookCopiesService';
import { BookCopiesComponent } from './BookCopies/bookCopies.component';
import { ClientComponent } from './Clients/client.component';
import { ClientService } from './Services/Client/ClientService';
import { LendingComponent } from './Lendings/lending.component';
import { LendingService } from './Services/Lendings/LendingService';
import { LendingEditComponent } from './Lendings/Edit/edit.component';
import { LibraryEditComponent } from './Library/Edit/edit.component';
import { PublisherEditComponent } from './Publishers/Edit/edit.component';
import { ClientEditComponent } from './Clients/Edit/edit.component';
import { BookCopiesEditComponent } from './BookCopies/Edit/edit.component';
import { BookEditComponent } from './Book/Edit/edit.component';


@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes, { useHash: true }),
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
    ],
    declarations: [AppComponent, LibraryComponent, BookComponent, PublisherComponent, BookCopiesComponent, ClientComponent, LendingComponent, LendingEditComponent,
        LibraryEditComponent, PublisherEditComponent, ClientEditComponent, BookCopiesEditComponent, BookEditComponent],
    bootstrap: [AppComponent],
    providers: [LibraryService, BookService, PublisherService, BookCopiesService, ClientService, LendingService]
})
export class AppModule { }
