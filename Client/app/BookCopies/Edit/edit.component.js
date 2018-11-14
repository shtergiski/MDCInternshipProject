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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var BookCopiesService_1 = require("../../Services/BookCopies/BookCopiesService");
var BookService_1 = require("../../Services/Book/BookService");
var LibraryService_1 = require("../../Services/Library/LibraryService");
var BookCopiesEditComponent = /** @class */ (function () {
    function BookCopiesEditComponent(_fb, _avRoute, _bookCopiesService, _bookService, _libraryService, _router) {
        this._fb = _fb;
        this._avRoute = _avRoute;
        this._bookCopiesService = _bookCopiesService;
        this._bookService = _bookService;
        this._libraryService = _libraryService;
        this._router = _router;
        this.title = "Add";
        this.id = 0;
        this.submitted = false;
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
        if (this._avRoute.snapshot.params["id"]) {
            this.id = parseInt(this._avRoute.snapshot.params["id"]);
            console.log(this.id);
            this.title = 'Edit';
        }
        this.bookCpsForm = this._fb.group({
            //id: 0,
            Book: "",
            Library: "",
            NumberOfCopies: "",
            BookCopiesID: "",
        });
    }
    BookCopiesEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.id > 0) {
            this._bookCopiesService.getBookCopiesById(this.id)
                .subscribe(function (resp) { return _this.bookCpsForm.patchValue(resp); }, function (error) { return _this.errorMessage = error; });
        }
        this.Refresh();
    };
    BookCopiesEditComponent.prototype.getBooks = function () {
        var _this = this;
        this._bookService.getBooks().subscribe(function (data) { return _this.books = data; });
    };
    BookCopiesEditComponent.prototype.getLibraries = function () {
        var _this = this;
        this._libraryService.getLibraries().subscribe(function (data) { return _this.libraries = data; });
    };
    BookCopiesEditComponent.prototype.Refresh = function () {
        this.getLibraries();
        this.getBooks();
    };
    BookCopiesEditComponent.prototype.save = function () {
        var _this = this;
        debugger;
        if (!this.bookCpsForm.valid) {
            this.submitted = true;
            return;
        }
        this._bookCopiesService.editBookCopy(this.bookCpsForm.value)
            .subscribe(function (copyId) {
            //alert('Saved Successfully!')
            _this._router.navigate(['bookCopies', { id: copyId }]);
        }, function (error) { return _this.errorMessage = error; });
    };
    BookCopiesEditComponent.prototype.cancel = function () {
        this._router.navigate(["bookCopies", { id: this.id }]);
    };
    Object.defineProperty(BookCopiesEditComponent.prototype, "bookss", {
        get: function () { return this.bookCpsForm.get('book'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookCopiesEditComponent.prototype, "libraryy", {
        get: function () { return this.bookCpsForm.get('library'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookCopiesEditComponent.prototype, "numberOfCopies", {
        get: function () { return this.bookCpsForm.get('numberOfCopies'); },
        enumerable: true,
        configurable: true
    });
    BookCopiesEditComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './edit.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.ActivatedRoute,
            BookCopiesService_1.BookCopiesService,
            BookService_1.BookService,
            LibraryService_1.LibraryService,
            router_1.Router])
    ], BookCopiesEditComponent);
    return BookCopiesEditComponent;
}());
exports.BookCopiesEditComponent = BookCopiesEditComponent;
//# sourceMappingURL=edit.component.js.map