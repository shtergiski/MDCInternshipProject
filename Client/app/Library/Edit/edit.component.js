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
var LibraryService_1 = require("../../Services/Library/LibraryService");
var LibraryEditComponent = /** @class */ (function () {
    function LibraryEditComponent(_fb, _avRoute, _libraryService, _router) {
        this._fb = _fb;
        this._avRoute = _avRoute;
        this._libraryService = _libraryService;
        this._router = _router;
        this.title = "Add";
        this.id = 0;
        this.submitted = false;
        if (this._avRoute.snapshot.params["id"]) {
            this.id = parseInt(this._avRoute.snapshot.params["id"]);
            console.log(this.id);
            this.title = 'Edit';
        }
        this.libraryForm = this._fb.group({
            //id: 0,
            Name: "",
            City: "",
            Address: "",
            LibraryID: ""
        });
    }
    LibraryEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.id > 0) {
            this._libraryService.getLibraryById(this.id)
                .subscribe(function (resp) { return _this.libraryForm.patchValue(resp); }, function (error) { return _this.errorMessage = error; });
        }
    };
    LibraryEditComponent.prototype.save = function () {
        var _this = this;
        debugger;
        if (!this.libraryForm.valid) {
            this.submitted = true;
            return;
        }
        this._libraryService.editLibrary(this.libraryForm.value)
            .subscribe(function (libId) {
            //alert('Saved Successfully!')
            _this._router.navigate(['library', { id: libId }]);
        }, function (error) { return _this.errorMessage = error; });
    };
    LibraryEditComponent.prototype.cancel = function () {
        this._router.navigate(["library", { id: this.id }]);
    };
    Object.defineProperty(LibraryEditComponent.prototype, "name", {
        get: function () { return this.libraryForm.get('Name'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LibraryEditComponent.prototype, "city", {
        get: function () { return this.libraryForm.get('City'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LibraryEditComponent.prototype, "address", {
        get: function () { return this.libraryForm.get('Address'); },
        enumerable: true,
        configurable: true
    });
    LibraryEditComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './edit.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.ActivatedRoute,
            LibraryService_1.LibraryService,
            router_1.Router])
    ], LibraryEditComponent);
    return LibraryEditComponent;
}());
exports.LibraryEditComponent = LibraryEditComponent;
//# sourceMappingURL=edit.component.js.map