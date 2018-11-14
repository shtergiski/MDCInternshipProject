import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { BookCopies } from '../../BookCopies/bookCopies';

@Injectable()
export class BookCopiesService {

    private bookCopiesServiceURL = 'http://localhost:50980/BookCopies/';
    constructor(private http: Http) { }

    getBookCopies(): Observable<BookCopies[]> {
        return this.http.get(this.bookCopiesServiceURL + "GetAllBookCopies")
            .map(this.extractData)
            .catch(this.handleError);
    }

    getBookCopiesById(id: any) {
        return this.http.get(this.bookCopiesServiceURL + "GetBookCopiesById/" + id)
            .map((response: Response) => response.json())
            .catch(this.handleError)
    }

    addBookCopy(bookCopies: BookCopies): Observable<BookCopies> {
        return this.http.post(this.bookCopiesServiceURL + "AddNewBookCopy", bookCopies)
            .map(this.extractData)
            .catch(this.handleError);
    }

    editBookCopy(bookCopies: BookCopies) {
        return this.http.post(this.bookCopiesServiceURL + "SaveBookCopies", bookCopies)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteBookCopy(bookCopies: BookCopies) {
        return this.http.post(this.bookCopiesServiceURL + "DeleteBookCopy", bookCopies)
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