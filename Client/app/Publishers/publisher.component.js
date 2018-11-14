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
require("rxjs/add/operator/catch");
var PublisherService_1 = require("../Services/Publisher/PublisherService");
var router_1 = require("@angular/router");
var PublisherComponent = /** @class */ (function () {
    function PublisherComponent(_publisherService, _router, _activatedRoute) {
        this._publisherService = _publisherService;
        this._router = _router;
        this._activatedRoute = _activatedRoute;
        this.publisher = {
            Name: "",
            Country: "",
            PublisherID: ""
        };
        this.currentId = 0;
    }
    PublisherComponent.prototype.ngOnInit = function () {
        if (this._activatedRoute.snapshot.params["id"])
            this.currentId = parseInt(this._activatedRoute.snapshot.params["id"]);
        this.getPublishers();
    };
    PublisherComponent.prototype.getPublishers = function () {
        var _this = this;
        this._publisherService.getPublishers().subscribe(function (data) { return _this.publishers = data; });
    };
    PublisherComponent.prototype.add = function () {
        this._router.navigate(['publishers/add']);
    };
    PublisherComponent.prototype.edit = function (id) {
        this._router.navigate(['publishers/edit/' + id]);
    };
    PublisherComponent.prototype.editPublisher = function (publisher) {
        this._publisherService.editPublisher(publisher).subscribe(function (data) { return console.log(data); });
    };
    PublisherComponent.prototype.deletePublisher = function (publisher) {
        this.publishers.splice(this.publishers.indexOf(publisher), 1);
        this._publisherService.deletePublisher(publisher).subscribe(function (data) { return console.log(data); });
    };
    PublisherComponent.prototype.addPublisher = function () {
        var _this = this;
        this._publisherService.addPublisher(this.publisher).subscribe(function (data) { return _this.publishers.push(data); });
        this.publisher = {
            Name: "",
            Country: "",
            PublisherID: ""
        };
    };
    PublisherComponent = __decorate([
        core_1.Component({
            selector: 'my-publisher',
            templateUrl: './publisher.component.html',
        }),
        __metadata("design:paramtypes", [PublisherService_1.PublisherService, router_1.Router, router_1.ActivatedRoute])
    ], PublisherComponent);
    return PublisherComponent;
}());
exports.PublisherComponent = PublisherComponent;
//# sourceMappingURL=publisher.component.js.map