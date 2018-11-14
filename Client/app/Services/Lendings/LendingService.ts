import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Lending } from '../../Lendings/lending';

@Injectable()
export class LendingService {

    private lendingServiceURL = 'http://localhost:50980/Lendings/';
    constructor(private http: Http) { }

    getLending(): Observable<Lending[]> {
        return this.http.get(this.lendingServiceURL + "GetAllLendings")
            .map(this.extractData)
            .catch(this.handleError);
    }

    getLendingById(id: any) {
        return this.http.get(this.lendingServiceURL + "GetLendingsById/" + id)
            .map((response: Response) => response.json())
            .catch(this.handleError)
    }

    //saveLending(lending: Lending) {
    //    return this.http.post(this.lendingServiceURL + 'SaveLending', lending)
    //        .map((response: Response) => response.json())
    //        .catch(this.handleError)
    //}

    addLending(lending: Lending): Observable<Lending> {
        return this.http.post(this.lendingServiceURL + "AddNewLending", lending)
            .map(this.extractData)
            .catch(this.handleError);
    }

   
    editLending(lending: Lending) {
        return this.http.post(this.lendingServiceURL + "SaveLending", lending)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteLending(lending: Lending) {
        return this.http.post(this.lendingServiceURL + "DeleteLending", lending)
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