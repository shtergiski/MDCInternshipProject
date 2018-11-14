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
var ClientService_1 = require("../../Services/Client/ClientService");
var ClientEditComponent = /** @class */ (function () {
    function ClientEditComponent(_fb, _avRoute, _clientService, _router) {
        this._fb = _fb;
        this._avRoute = _avRoute;
        this._clientService = _clientService;
        this._router = _router;
        this.title = "Add";
        this.id = 0;
        this.submitted = false;
        if (this._avRoute.snapshot.params["id"]) {
            this.id = parseInt(this._avRoute.snapshot.params["id"]);
            console.log(this.id);
            this.title = 'Edit';
        }
        this.clientForm = this._fb.group({
            //id: 0,
            Name: "",
            Phone: "",
            Address: "",
            City: "",
            ClientID: ""
        });
    }
    ClientEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.id > 0) {
            this._clientService.getClientById(this.id)
                .subscribe(function (resp) { return _this.clientForm.patchValue(resp); }, function (error) { return _this.errorMessage = error; });
        }
    };
    ClientEditComponent.prototype.save = function () {
        var _this = this;
        debugger;
        if (!this.clientForm.valid) {
            this.submitted = true;
            return;
        }
        this._clientService.editClient(this.clientForm.value)
            .subscribe(function (cliId) {
            //alert('Saved Successfully!')
            _this._router.navigate(['client', { id: cliId }]);
        }, function (error) { return _this.errorMessage = error; });
    };
    ClientEditComponent.prototype.cancel = function () {
        this._router.navigate(["client", { id: this.id }]);
    };
    Object.defineProperty(ClientEditComponent.prototype, "name", {
        get: function () { return this.clientForm.get('name'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientEditComponent.prototype, "phone", {
        get: function () { return this.clientForm.get('phone'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientEditComponent.prototype, "address", {
        get: function () { return this.clientForm.get('address'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientEditComponent.prototype, "city", {
        get: function () { return this.clientForm.get('city'); },
        enumerable: true,
        configurable: true
    });
    ClientEditComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './edit.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.ActivatedRoute,
            ClientService_1.ClientService,
            router_1.Router])
    ], ClientEditComponent);
    return ClientEditComponent;
}());
exports.ClientEditComponent = ClientEditComponent;
//# sourceMappingURL=edit.component.js.map