"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BookService_1 = require("../Services/Book/BookService");
var PublisherService_1 = require("../Services/Publisher/PublisherService");
var router_1 = require("@angular/router");
var BookComponent = /** @class */ (function () {
    function BookComponent(_bookService, _publisherService, _router, _activatedRoute) {
        this._bookService = _bookService;
        this._publisherService = _publisherService;
        this._router = _router;
        this._activatedRoute = _activatedRoute;
        this.book = {
            Title: "",
            YearOfIssue: "",
            NumberOfPages: "",
            Publisher: "",
            Publisher1: null,
            BookID: ""
        };
        this.publisher = {
            Name: "",
            Country: "",
            PublisherID: ""
        };
        this.currentId = 0;
    }
    BookComponent.prototype.ngOnInit = function () {
        if (this._activatedRoute.snapshot.params["id"])
            this.currentId = parseInt(this._activatedRoute.snapshot.params["id"]);
        this.Refresh();
    };
    BookComponent.prototype.getPublishers = function () {
        var _this = this;
        this._publisherService.getPublishers().subscribe(function (pub) { return _this.publishers = pub; });
    };
    BookComponent.prototype.getBooks = function () {
        var _this = this;
        this._bookService.getBooks().subscribe(function (data) { return _this.books = data; });
    };
    BookComponent.prototype.Refresh = function () {
        this.getBooks();
        this.getPublishers();
    };
    BookComponent.prototype.add = function () {
        this._router.navigate(['book/add']);
    };
    BookComponent.prototype.edit = function (id) {
        this._router.navigate(['book/edit/' + id]);
    };
    BookComponent.prototype.editBook = function (book) {
        this._bookService.editBook(book).subscribe(function (data) { return console.log(data); });
    };
    BookComponent.prototype.deleteBook = function (book) {
        this.books.splice(this.books.indexOf(book), 1);
        this._bookService.deleteBook(book).subscribe(function (data) { return console.log(data); });
    };
    BookComponent = __decorate([
        core_1.Component({
            selector: 'my-book',
            templateUrl: './book.component.html',
        }),
        __metadata("design:paramtypes", [BookService_1.BookService, PublisherService_1.PublisherService, router_1.Router, router_1.ActivatedRoute])
    ], BookComponent);
    return BookComponent;
}());
exports.BookComponent = BookComponent;
//# sourceMappingURL=book.component.js.map