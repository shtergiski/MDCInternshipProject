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
var LibraryService_1 = require("../Services/Library/LibraryService");
var library_1 = require("./library");
var router_1 = require("@angular/router");
var LibraryComponent = /** @class */ (function () {
    function LibraryComponent(_libraryService, _router, _activatedRoute) {
        this._libraryService = _libraryService;
        this._router = _router;
        this._activatedRoute = _activatedRoute;
        this.currentId = 0;
        this.library = {
            Name: "",
            Address: "",
            City: "",
            LibraryID: ""
        };
    }
    LibraryComponent.prototype.ngOnInit = function () {
        if (this._activatedRoute.snapshot.params["id"])
            this.currentId = parseInt(this._activatedRoute.snapshot.params["id"]);
        this.getLibrary();
    };
    LibraryComponent.prototype.getLibrary = function () {
        var _this = this;
        this._libraryService.getLibraries().subscribe(function (data) { return _this.libraries = data; });
    };
    LibraryComponent.prototype.add = function () {
        this._router.navigate(['library/add']);
    };
    LibraryComponent.prototype.edit = function (id) {
        this._router.navigate(['library/edit/' + id]);
    };
    LibraryComponent.prototype.editLibrary = function (library) {
        this._libraryService.editLibrary(library).subscribe(function (data) { return console.log(data); });
    };
    LibraryComponent.prototype.deleteLibrary = function (library) {
        this.libraries.splice(this.libraries.indexOf(library), 1);
        this._libraryService.deleteLibrary(library).subscribe(function (data) { return console.log(data); });
    };
    LibraryComponent.prototype.clearData = function () {
        this.library = new library_1.Library();
    };
    LibraryComponent.prototype.addLibrary = function () {
        var _this = this;
        this._libraryService.addLibrary(this.library).subscribe(function (data) { return _this.libraries.push(data); });
        this.library = {
            Name: "",
            Address: "",
            City: "",
            LibraryID: ""
        };
    };
    LibraryComponent = __decorate([
        core_1.Component({
            selector: 'my-library',
            templateUrl: './library.component.html'
        }),
        __metadata("design:paramtypes", [LibraryService_1.LibraryService, router_1.Router, router_1.ActivatedRoute])
    ], LibraryComponent);
    return LibraryComponent;
}());
exports.LibraryComponent = LibraryComponent;
//# sourceMappingURL=library.component.js.map