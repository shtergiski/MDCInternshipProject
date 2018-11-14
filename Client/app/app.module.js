"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var library_component_1 = require("./Library/library.component");
var book_component_1 = require("./Book/book.component");
var publisher_component_1 = require("./Publishers/publisher.component");
var LibraryService_1 = require("./Services/Library/LibraryService");
var app_routing_1 = require("./app.routing");
var BookService_1 = require("./Services/Book/BookService");
var PublisherService_1 = require("./Services/Publisher/PublisherService");
var BookCopiesService_1 = require("./Services/BookCopies/BookCopiesService");
var bookCopies_component_1 = require("./BookCopies/bookCopies.component");
var client_component_1 = require("./Clients/client.component");
var ClientService_1 = require("./Services/Client/ClientService");
var lending_component_1 = require("./Lendings/lending.component");
var LendingService_1 = require("./Services/Lendings/LendingService");
var edit_component_1 = require("./Lendings/Edit/edit.component");
var edit_component_2 = require("./Library/Edit/edit.component");
var edit_component_3 = require("./Publishers/Edit/edit.component");
var edit_component_4 = require("./Clients/Edit/edit.component");
var edit_component_5 = require("./BookCopies/Edit/edit.component");
var edit_component_6 = require("./Book/Edit/edit.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                router_1.RouterModule.forRoot(app_routing_1.routes, { useHash: true }),
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
            ],
            declarations: [app_component_1.AppComponent, library_component_1.LibraryComponent, book_component_1.BookComponent, publisher_component_1.PublisherComponent, bookCopies_component_1.BookCopiesComponent, client_component_1.ClientComponent, lending_component_1.LendingComponent, edit_component_1.LendingEditComponent,
                edit_component_2.LibraryEditComponent, edit_component_3.PublisherEditComponent, edit_component_4.ClientEditComponent, edit_component_5.BookCopiesEditComponent, edit_component_6.BookEditComponent],
            bootstrap: [app_component_1.AppComponent],
            providers: [LibraryService_1.LibraryService, BookService_1.BookService, PublisherService_1.PublisherService, BookCopiesService_1.BookCopiesService, ClientService_1.ClientService, LendingService_1.LendingService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map