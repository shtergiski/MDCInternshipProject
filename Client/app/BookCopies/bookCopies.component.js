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
var BookCopiesService_1 = require("../Services/BookCopies/BookCopiesService");
var LibraryService_1 = require("../Services/Library/LibraryService");
var router_1 = require("@angular/router");
var BookCopiesComponent = /** @class */ (function () {
    function BookCopiesComponent(_bookCopiesService, _bookService, _libraryService, _router, _activatedRoute) {
        this._bookCopiesService = _bookCopiesService;
        this._bookService = _bookService;
        this._libraryService = _libraryService;
        this._router = _router;
        this._activatedRoute = _activatedRoute;
        this.bookCopy = {
            Book: "",
            Library: "",
            NumberOfCopies: "",
            Book1: null,
            Library1: null,
            BookCopiesID: ""
        };
        this.book = {
            Title: "",
            YearOfIssue: "",
            NumberOfPages: "",
            Publisher: "",
            Publisher1: null,
            BookID: ""
        };
        this.library = {
            Name: "",
            Address: "",
            City: "",
            LibraryID: ""
        };
        this.currentId = 0;
    }
    BookCopiesComponent.prototype.ngOnInit = function () {
        if (this._activatedRoute.snapshot.params["id"])
            this.currentId = parseInt(this._activatedRoute.snapshot.params["id"]);
        this.Refresh();
    };
    BookCopiesComponent.prototype.getBookCopies = function () {
        var _this = this;
        this._bookCopiesService.getBookCopies().subscribe(function (data) { return _this.bookCopies = data; });
    };
    BookCopiesComponent.prototype.getLibrary = function () {
        var _this = this;
        this._libraryService.getLibraries().subscribe(function (data) { return _this.libraries = data; });
    };
    BookCopiesComponent.prototype.getBooks = function () {
        var _this = this;
        this._bookService.getBooks().subscribe(function (data) { return _this.books = data; });
    };
    BookCopiesComponent.prototype.Refresh = function () {
        this.getBooks();
        this.getBookCopies();
        this.getLibrary();
    };
    BookCopiesComponent.prototype.add = function () {
        this._router.navigate(['bookCopies/add']);
    };
    BookCopiesComponent.prototype.edit = function (id) {
        this._router.navigate(['bookCopies/edit/' + id]);
    };
    BookCopiesComponent.prototype.editBookCopy = function (bookCopy) {
        this._bookCopiesService.editBookCopy(bookCopy).subscribe(function (data) { return console.log(data); });
    };
    BookCopiesComponent.prototype.deleteBookCopy = function (bookCopy) {
        this.bookCopies.splice(this.bookCopies.indexOf(bookCopy), 1);
        this._bookCopiesService.deleteBookCopy(bookCopy).subscribe(function (data) { return console.log(data); });
    };
    BookCopiesComponent = __decorate([
        core_1.Component({
            selector: 'my-bookCopy',
            templateUrl: './bookCopies.component.html',
        }),
        __metadata("design:paramtypes", [BookCopiesService_1.BookCopiesService, BookService_1.BookService, LibraryService_1.LibraryService, router_1.Router, router_1.ActivatedRoute])
    ], BookCopiesComponent);
    return BookCopiesComponent;
}());
exports.BookCopiesComponent = BookCopiesComponent;
//# sourceMappingURL=bookCopies.component.js.map