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
var LendingService_1 = require("../Services/Lendings/LendingService");
var ClientService_1 = require("../Services/Client/ClientService");
var BookService_1 = require("../Services/Book/BookService");
var router_1 = require("@angular/router");
var LendingComponent = /** @class */ (function () {
    function LendingComponent(_lendingService, _clientService, _bookService, _router, _activatedRoute) {
        this._lendingService = _lendingService;
        this._clientService = _clientService;
        this._bookService = _bookService;
        this._router = _router;
        this._activatedRoute = _activatedRoute;
        this.currentId = 0;
        this.lending = {
            Book: "",
            Client: "",
            DateOfLending: "",
            DateOfReturn: "",
            Client1: null,
            Book1: null,
            LendingID: ""
        };
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
    }
    LendingComponent.prototype.ngOnInit = function () {
        if (this._activatedRoute.snapshot.params["id"])
            this.currentId = parseInt(this._activatedRoute.snapshot.params["id"]);
        this.Refresh();
    };
    LendingComponent.prototype.getClients = function () {
        var _this = this;
        this._clientService.getClients().subscribe(function (data) { return _this.clients = data; });
    };
    LendingComponent.prototype.getBooks = function () {
        var _this = this;
        this._bookService.getBooks().subscribe(function (data) { return _this.books = data; });
    };
    LendingComponent.prototype.getLendings = function () {
        var _this = this;
        this._lendingService.getLending().subscribe(function (data) { return _this.lendings = data; });
    };
    LendingComponent.prototype.Refresh = function () {
        this.getBooks();
        this.getClients();
        this.getLendings();
    };
    LendingComponent.prototype.add = function () {
        this._router.navigate(['lending/add']);
    };
    LendingComponent.prototype.edit = function (id) {
        this._router.navigate(['lending/edit/' + id]);
    };
    LendingComponent.prototype.editLending = function (lending) {
        this._lendingService.editLending(lending).subscribe(function (data) { return console.log(data); });
    };
    LendingComponent.prototype.deleteLending = function (lending) {
        this.lendings.splice(this.lendings.indexOf(lending), 1);
        this._lendingService.deleteLending(lending).subscribe(function (data) { return console.log(data); });
    };
    LendingComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './lending.component.html',
        }),
        __metadata("design:paramtypes", [LendingService_1.LendingService,
            ClientService_1.ClientService,
            BookService_1.BookService,
            router_1.Router, router_1.ActivatedRoute])
    ], LendingComponent);
    return LendingComponent;
}());
exports.LendingComponent = LendingComponent;
//# sourceMappingURL=lending.component.js.map