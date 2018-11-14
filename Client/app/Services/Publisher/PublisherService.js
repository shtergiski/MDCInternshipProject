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
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var PublisherService = /** @class */ (function () {
    function PublisherService(http) {
        this.http = http;
        this.publisherServiceURL = 'http://localhost:50980/Publishers/';
    }
    PublisherService.prototype.getPublishers = function () {
        return this.http.get(this.publisherServiceURL + "GetAllPublishers")
            .map(this.extractData)
            .catch(this.handleError);
    };
    PublisherService.prototype.getPublishersById = function (id) {
        return this.http.get(this.publisherServiceURL + "GetPublishersById/" + id)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PublisherService.prototype.addPublisher = function (publisher) {
        return this.http.post(this.publisherServiceURL + "AddNewPublisher", publisher)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PublisherService.prototype.editPublisher = function (publisher) {
        return this.http.post(this.publisherServiceURL + "SavePublishers", publisher)
            .map(this.extractData)
            .catch(this.handleError);
    };
    //savePublisher(publisher: Publisher) {
    //    return this.http.post(this.publisherServiceURL + 'SavePublishers', publisher)
    //        .map((response: Response) => response.json())
    //        .catch(this.handleError)
    //}
    PublisherService.prototype.deletePublisher = function (publisher) {
        return this.http.post(this.publisherServiceURL + "DeletePublisher", publisher)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PublisherService.prototype.extractData = function (res) {
        var body = res.json();
        console.log(body);
        return body;
    };
    PublisherService.prototype.handleError = function (error) {
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
        return Rx_1.Observable.throw(errMsg);
    };
    PublisherService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], PublisherService);
    return PublisherService;
}());
exports.PublisherService = PublisherService;
//# sourceMappingURL=PublisherService.js.map