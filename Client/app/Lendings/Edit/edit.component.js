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
var LendingService_1 = require("../../Services/Lendings/LendingService");
var ClientService_1 = require("../../Services/Client/ClientService");
var BookService_1 = require("../../Services/Book/BookService");
var LendingEditComponent = /** @class */ (function () {
    function LendingEditComponent(_fb, _avRoute, _lendingService, _router, _clientService, _bookService) {
        this._fb = _fb;
        this._avRoute = _avRoute;
        this._lendingService = _lendingService;
        this._router = _router;
        this._clientService = _clientService;
        this._bookService = _bookService;
        this.title = "Add";
        this.id = 0;
        this.submitted = false;
        this.client = {
            Name: "",
            Phone: "",
            Address: "",
            City: "",
            ClientID: ""
        };
        this.book = {
            Title: "",
            YearOfIssue: "",
            NumberOfPages: "",
            Publisher: "",
            Publisher1: null,
            BookID: ""
        };
        if (this._avRoute.snapshot.params["id"]) {
            this.id = parseInt(this._avRoute.snapshot.params["id"]);
            console.log(this.id);
            this.title = 'Edit';
        }
        this.lendingForm = this._fb.group({
            //id: 0,
            Book: "",
            Client: "",
            DateOfLending: "",
            DateOfReturn: "",
            //Book1: null,
            //Client1: null,
            LendingID: ""
        });
    }
    LendingEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.id > 0) {
            this._lendingService.getLendingById(this.id)
                .subscribe(function (resp) { return _this.lendingForm.patchValue(resp); }, function (error) { return _this.errorMessage = error; });
        }
        this.Refresh();
    };
    LendingEditComponent.prototype.getClients = function () {
        var _this = this;
        this._clientService.getClients().subscribe(function (data) { return _this.clients = data; });
    };
    LendingEditComponent.prototype.getBooks = function () {
        var _this = this;
        this._bookService.getBooks().subscribe(function (data) { return _this.books = data; });
    };
    LendingEditComponent.prototype.Refresh = function () {
        this.getBooks();
        this.getClients();
    };
    LendingEditComponent.prototype.save = function () {
        var _this = this;
        debugger;
        if (!this.lendingForm.valid) {
            this.submitted = true;
            return;
        }
        this._lendingService.editLending(this.lendingForm.value)
            .subscribe(function (lendId) {
            //alert('Saved Successfully!')
            _this._router.navigate(['lending', { id: lendId }]);
        }, function (error) { return _this.errorMessage = error; });
    };
    LendingEditComponent.prototype.cancel = function () {
        this._router.navigate(["lending", { id: this.id }]);
    };
    Object.defineProperty(LendingEditComponent.prototype, "books1", {
        get: function () { return this.lendingForm.get('Book'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LendingEditComponent.prototype, "clients1", {
        get: function () { return this.lendingForm.get('Client'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LendingEditComponent.prototype, "dateOfLending", {
        get: function () { return this.lendingForm.get('DateOfLending'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LendingEditComponent.prototype, "dateOfReturn", {
        get: function () { return this.lendingForm.get('DateOfReturn'); },
        enumerable: true,
        configurable: true
    });
    LendingEditComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './edit.component.html',
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.ActivatedRoute,
            LendingService_1.LendingService,
            router_1.Router,
            ClientService_1.ClientService,
            BookService_1.BookService])
    ], LendingEditComponent);
    return LendingEditComponent;
}());
exports.LendingEditComponent = LendingEditComponent;
//# sourceMappingURL=edit.component.js.map