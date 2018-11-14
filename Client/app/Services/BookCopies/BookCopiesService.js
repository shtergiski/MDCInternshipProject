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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var BookCopiesService = /** @class */ (function () {
    function BookCopiesService(http) {
        this.http = http;
        this.bookCopiesServiceURL = 'http://localhost:50980/BookCopies/';
    }
    BookCopiesService.prototype.getBookCopies = function () {
        return this.http.get(this.bookCopiesServiceURL + "GetAllBookCopies")
            .map(this.extractData)
            .catch(this.handleError);
    };
    BookCopiesService.prototype.getBookCopiesById = function (id) {
        return this.http.get(this.bookCopiesServiceURL + "GetBookCopiesById/" + id)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    BookCopiesService.prototype.addBookCopy = function (bookCopies) {
        return this.http.post(this.bookCopiesServiceURL + "AddNewBookCopy", bookCopies)
            .map(this.extractData)
            .catch(this.handleError);
    };
    BookCopiesService.prototype.editBookCopy = function (bookCopies) {
        return this.http.post(this.bookCopiesServiceURL + "SaveBookCopies", bookCopies)
            .map(this.extractData)
            .catch(this.handleError);
    };
    BookCopiesService.prototype.deleteBookCopy = function (bookCopies) {
        return this.http.post(this.bookCopiesServiceURL + "DeleteBookCopy", bookCopies)
            .map(this.extractData)
            .catch(this.handleError);
    };
    BookCopiesService.prototype.extractData = function (res) {
        var body = res.json();
        console.log(body);
        return body;
    };
    BookCopiesService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    BookCopiesService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], BookCopiesService);
    return BookCopiesService;
}());
exports.BookCopiesService = BookCopiesService;
//# sourceMappingURL=BookCopiesService.js.map