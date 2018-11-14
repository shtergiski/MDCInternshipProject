import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Client } from '../../Clients/client';

@Injectable()
export class ClientService {

   

    private clientServiceURL = 'http://localhost:50980/Clients/';
    constructor(private http: Http) { }

    getClients(): Observable<Client[]> {
        return this.http.get(this.clientServiceURL + "GetAllClients")
            .map(this.extractData)
            .catch(this.handleError);
    }

    getClientById(id: any) {
        return this.http.get(this.clientServiceURL + "GetClientsById/" + id)
            .map((response: Response) => response.json())
            .catch(this.handleError)
    }

    addClient(client: Client): Observable<Client> {
        return this.http.post(this.clientServiceURL + "AddNewClient", client)
            .map(this.extractData)
            .catch(this.handleError);
    }

    editClient(client: Client) {
        return this.http.post(this.clientServiceURL + "SaveClients", client)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteClient(client: Client) {
        return this.http.post(this.clientServiceURL + "DeleteClient", client)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        console.log(body);
        return body;
    }
    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}