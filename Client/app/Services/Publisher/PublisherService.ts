import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Publisher } from '../../Publishers/publisher';

@Injectable()
export class PublisherService {

    private publisherServiceURL = 'http://localhost:50980/Publishers/';
    constructor(private http: Http) { }

    getPublishers(): Observable<Publisher[]> {
        return this.http.get(this.publisherServiceURL + "GetAllPublishers")
            .map(this.extractData)
            .catch(this.handleError);
    }

    getPublishersById(id: any) {
        return this.http.get(this.publisherServiceURL + "GetPublishersById/" + id)
            .map((response: Response) => response.json())
            .catch(this.handleError)
    }

    addPublisher(publisher: Publisher): Observable<Publisher> {
        return this.http.post(this.publisherServiceURL + "AddNewPublisher", publisher)
            .map(this.extractData)
            .catch(this.handleError);
    }

    editPublisher(publisher: Publisher) {
        return this.http.post(this.publisherServiceURL + "SavePublishers", publisher)
            .map(this.extractData)
            .catch(this.handleError);
    }

    //savePublisher(publisher: Publisher) {
    //    return this.http.post(this.publisherServiceURL + 'SavePublishers', publisher)
    //        .map((response: Response) => response.json())
    //        .catch(this.handleError)
    //}

   

    deletePublisher(publisher: Publisher) {
        return this.http.post(this.publisherServiceURL + "DeletePublisher", publisher)
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