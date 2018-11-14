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
var client_1 = require("./client");
var ClientService_1 = require("../Services/Client/ClientService");
var router_1 = require("@angular/router");
var ClientComponent = /** @class */ (function () {
    function ClientComponent(_clientService, _router, _activatedRoute) {
        this._clientService = _clientService;
        this._router = _router;
        this._activatedRoute = _activatedRoute;
        this.client = {
            Name: "",
            Phone: "",
            Address: "",
            City: "",
            ClientID: ""
        };
        this.currentId = 0;
    }
    ClientComponent.prototype.ngOnInit = function () {
        if (this._activatedRoute.snapshot.params["id"])
            this.currentId = parseInt(this._activatedRoute.snapshot.params["id"]);
        this.getClients();
    };
    ClientComponent.prototype.getClients = function () {
        var _this = this;
        this._clientService.getClients().subscribe(function (data) { return _this.clients = data; });
    };
    ClientComponent.prototype.add = function () {
        this._router.navigate(['client/add']);
    };
    ClientComponent.prototype.edit = function (id) {
        this._router.navigate(['client/edit/' + id]);
    };
    ClientComponent.prototype.editClient = function (client) {
        this._clientService.editClient(client).subscribe(function (data) { return console.log(data); });
    };
    ClientComponent.prototype.deleteClient = function (client) {
        this.clients.splice(this.clients.indexOf(client), 1);
        this._clientService.deleteClient(client).subscribe(function (data) { return console.log(data); });
    };
    ClientComponent.prototype.clearData = function () {
        this.client = new client_1.Client();
    };
    ClientComponent.prototype.addClient = function () {
        var _this = this;
        this._clientService.addClient(this.client).subscribe(function (data) { return _this.clients.push(data); });
        this.client = {
            Name: "",
            Phone: "",
            Address: "",
            City: "",
            ClientID: ""
        };
    };
    ClientComponent = __decorate([
        core_1.Component({
            selector: 'my-client',
            templateUrl: './client.component.html',
        }),
        __metadata("design:paramtypes", [ClientService_1.ClientService, router_1.Router, router_1.ActivatedRoute])
    ], ClientComponent);
    return ClientComponent;
}());
exports.ClientComponent = ClientComponent;
//# sourceMappingURL=client.component.js.map