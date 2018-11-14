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
var PublisherService_1 = require("../../Services/Publisher/PublisherService");
var PublisherEditComponent = /** @class */ (function () {
    function PublisherEditComponent(_fb, _avRoute, _publisherService, _router) {
        this._fb = _fb;
        this._avRoute = _avRoute;
        this._publisherService = _publisherService;
        this._router = _router;
        this.title = "Add";
        this.id = 0;
        this.submitted = false;
        if (this._avRoute.snapshot.params["id"]) {
            this.id = parseInt(this._avRoute.snapshot.params["id"]);
            console.log(this.id);
            this.title = 'Edit';
        }
        this.publisherForm = this._fb.group({
            Name: "",
            Country: "",
            PublisherID: ""
        });
    }
    PublisherEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.id > 0) {
            this._publisherService.getPublishersById(this.id)
                .subscribe(function (resp) { return _this.publisherForm.patchValue(resp); }, function (error) { return _this.errorMessage = error; });
        }
    };
    PublisherEditComponent.prototype.save = function () {
        var _this = this;
        if (!this.publisherForm.valid) {
            this.submitted = true;
            return;
        }
        this._publisherService.editPublisher(this.publisherForm.value)
            .subscribe(function (pubId) {
            //alert('Saved Successfully!')
            _this._router.navigate(['publishers', { id: pubId }]);
        }, function (error) { return _this.errorMessage = error; });
    };
    PublisherEditComponent.prototype.cancel = function () {
        this._router.navigate(["publishers", { id: this.id }]);
    };
    Object.defineProperty(PublisherEditComponent.prototype, "name", {
        get: function () { return this.publisherForm.get('name'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PublisherEditComponent.prototype, "country", {
        get: function () { return this.publisherForm.get('country'); },
        enumerable: true,
        configurable: true
    });
    PublisherEditComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './edit.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.ActivatedRoute,
            PublisherService_1.PublisherService,
            router_1.Router])
    ], PublisherEditComponent);
    return PublisherEditComponent;
}());
exports.PublisherEditComponent = PublisherEditComponent;
//# sourceMappingURL=edit.component.js.map