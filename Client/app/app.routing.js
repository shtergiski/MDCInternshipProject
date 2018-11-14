"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var library_component_1 = require("./Library/library.component");
var book_component_1 = require("./Book/book.component");
var publisher_component_1 = require("./Publishers/publisher.component");
var bookCopies_component_1 = require("./BookCopies/bookCopies.component");
var client_component_1 = require("./Clients/client.component");
var lending_component_1 = require("./Lendings/lending.component");
var edit_component_1 = require("./Lendings/Edit/edit.component");
var edit_component_2 = require("./Library/Edit/edit.component");
var edit_component_3 = require("./Publishers/Edit/edit.component");
var edit_component_4 = require("./Clients/Edit/edit.component");
var edit_component_5 = require("./BookCopies/Edit/edit.component");
var edit_component_6 = require("./Book/Edit/edit.component");
exports.routes = [
    { path: '', component: library_component_1.LibraryComponent },
    { path: 'library', component: library_component_1.LibraryComponent },
    { path: 'publishers', component: publisher_component_1.PublisherComponent },
    { path: 'book', component: book_component_1.BookComponent },
    { path: 'bookCopies', component: bookCopies_component_1.BookCopiesComponent },
    { path: 'client', component: client_component_1.ClientComponent },
    { path: 'lending', component: lending_component_1.LendingComponent },
    { path: 'lending/add', component: edit_component_1.LendingEditComponent },
    { path: 'lending/edit/:id', component: edit_component_1.LendingEditComponent },
    { path: 'library/add', component: edit_component_2.LibraryEditComponent },
    { path: 'library/edit/:id', component: edit_component_2.LibraryEditComponent },
    { path: 'publishers/add', component: edit_component_3.PublisherEditComponent },
    { path: 'publishers/edit/:id', component: edit_component_3.PublisherEditComponent },
    { path: 'client/add', component: edit_component_4.ClientEditComponent },
    { path: 'client/edit/:id', component: edit_component_4.ClientEditComponent },
    { path: 'bookCopies/add', component: edit_component_5.BookCopiesEditComponent },
    { path: 'bookCopies/edit/:id', component: edit_component_5.BookCopiesEditComponent },
    { path: 'book/add', component: edit_component_6.BookEditComponent },
    { path: 'book/edit/:id', component: edit_component_6.BookEditComponent },
];
//# sourceMappingURL=app.routing.js.map