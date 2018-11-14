import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Book } from '../../Book/book';

@Injectable()
export class BookService {

    private bookServiceURL = 'http://localhost:50980/Books/';
    constructor(private http: Http) { }

    getBooks(): Observable<Book[]> {
        return this.http.get(this.bookServiceURL + "GetAllBooks")
            .map(this.extractData)
            .catch(this.handleError);
    }

    getBookById(id: any) {
        return this.http.get(this.bookServiceURL + "GetBookById/" + id)
            .map((response: Response) => response.json())
            .catch(this.handleError)
    }

    addBook(book: Book): Observable<Book> {
        return this.http.post(this.bookServiceURL + "AddNewBook", book)
            .map(this.extractData)
            .catch(this.handleError);
    }

    editBook(book: Book): Observable<Book> {
        return this.http.post(this.bookServiceURL + "SaveBooks", book)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteBook(book: Book) {
        return this.http.post(this.bookServiceURL + "DeleteBook", book)
            .map(this.extractData)
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