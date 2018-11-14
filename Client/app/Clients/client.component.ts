import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from '../Services/Client/ClientService';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'my-client',
    templateUrl: './client.component.html',
})
export class ClientComponent implements OnInit {
    public clients: Client[];
    client: Client = {
        Name: "",
        Phone: "",
        Address: "",
        City: "",
        ClientID:""
    };

    errorMessage: any;
    currentId: number = 0;

    constructor(private _clientService: ClientService, private _router: Router, private _activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        if (this._activatedRoute.snapshot.params["id"])
            this.currentId = parseInt(this._activatedRoute.snapshot.params["id"]);
        this.getClients();
       
    }

    getClients(): any {
        this._clientService.getClients().subscribe(
            data => this.clients = data
        )
    }

    add() {
        this._router.navigate(['client/add']);
    }

    edit(id: any) {
        this._router.navigate(['client/edit/' + id])
    }

    editClient(client: Client) {
        this._clientService.editClient(client).subscribe(
            data => console.log(data)
        )
    }

    deleteClient(client: Client) {
        this.clients.splice(this.clients.indexOf(client), 1);
        this._clientService.deleteClient(client).subscribe(
            data => console.log(data)
        )
    }

    clearData(): void {
        this.client = new Client();
    }

    addClient() {
        this._clientService.addClient(this.client).subscribe(
            data => this.clients.push(data)
        )

        this.client = {
            Name: "",
            Phone: "",
            Address: "",
            City: "",
            ClientID: ""
        }
    }

}
