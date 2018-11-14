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
var BookService_1 = require("../../Services/Book/BookService");
var router_1 = require("@angular/router");
var PublisherService_1 = require("../../Services/Publisher/PublisherService");
var BookEditComponent = /** @class */ (function () {
    function BookEditComponent(_fb, _avRoute, _bookService, _publisherService, _router) {
        this._fb = _fb;
        this._avRoute = _avRoute;
        this._bookService = _bookService;
        this._publisherService = _publisherService;
        this._router = _router;
        this.title1 = "Add";
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
        this.publisher = {
            Name: "",
            Country: "",
            PublisherID: ""
        };
        if (this._avRoute.snapshot.params["id"]) {
            this.id = parseInt(this._avRoute.snapshot.params["id"]);
            console.log(this.id);
            this.title1 = 'Edit';
        }
        this.bookForm = this._fb.group({
            //id: 0,
            Title: "",
            YearOfIssue: "",
            NumberOfPages: "",
            BookID: "",
            Publisher: "",
        });
    }
    BookEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.id > 0) {
            this._bookService.getBookById(this.id)
                .subscribe(function (resp) { return _this.bookForm.patchValue(resp); }, function (error) { return _this.errorMessage = error; });
        }
        this.getPublishers();
    };
    BookEditComponent.prototype.getPublishers = function () {
        var _this = this;
        this._publisherService.getPublishers().subscribe(function (pub) { return _this.publishers = pub; });
    };
    //}
    //getBooks() {
    //    this._bookService.getBooks().subscribe(
    //        data => this.books = data
    //    )
    //}
    //Refresh() {
    //    this.getPublishers();
    //    this.getBooks();
    //}
    BookEditComponent.prototype.save = function () {
        var _this = this;
        debugger;
        if (!this.bookForm.valid) {
            this.submitted = true;
            return;
        }
        this._bookService.editBook(this.bookForm.value)
            .subscribe(function (bookId) {
            //alert('Saved Successfully!')
            _this._router.navigate(['book', { id: bookId }]);
        }, function (error) { return _this.errorMessage = error; });
    };
    BookEditComponent.prototype.cancel = function () {
        this._router.navigate(["book", { id: this.id }]);
    };
    Object.defineProperty(BookEditComponent.prototype, "title", {
        get: function () { return this.bookForm.get('title'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookEditComponent.prototype, "yearOfIssue", {
        get: function () { return this.bookForm.get('yearOfIssue'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookEditComponent.prototype, "numberOfPages", {
        get: function () { return this.bookForm.get('numberOfPages'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookEditComponent.prototype, "publisherrr", {
        get: function () { return this.bookForm.get('publisher'); },
        enumerable: true,
        configurable: true
    });
    BookEditComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './edit.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.ActivatedRoute,
            BookService_1.BookService,
            PublisherService_1.PublisherService,
            router_1.Router])
    ], BookEditComponent);
    return BookEditComponent;
}());
exports.BookEditComponent = BookEditComponent;
//# sourceMappingURL=edit.component.js.map