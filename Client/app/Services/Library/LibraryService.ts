import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Library } from '../../Library/library';

@Injectable()
export class LibraryService {

    private libraryServiceURL = 'http://localhost:50980/Libraries/';
   
    constructor(private http: Http) {}

    getLibraries(): Observable<Library[]> {
        return this.http.get(this.libraryServiceURL + "GetAllLibraries")
            .map(this.extractData)
            .catch(this.handleError);
    }
   
    addLibrary(library: Library): Observable<Library> {
       return  this.http.post(this.libraryServiceURL + "AddNewLibrary", library)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getLibraryById(id: any) {
        return this.http.get(this.libraryServiceURL + "GetLibrariesById/" + id)
            .map((response: Response) => response.json())
            .catch(this.handleError)
    }

    //saveLibrary(library: Library) {
    //    return this.http.post(this.libraryServiceURL + 'SaveLibraries', library)
    //        .map((response: Response) => response.json())
    //        .catch(this.handleError)
    //}

    //deleteLibrary(id: any) {
    //    return this.http.delete(this.libraryServiceURL + "DeleteLibrary/" + id)
    //        .map((response: Response) => response.json())
    //        .catch(this.handleError)
    //}

    editLibrary(library: Library) {
        return this.http.post(this.libraryServiceURL + "SaveLibraries", library)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteLibrary(library: Library) {
        return this.http.post(this.libraryServiceURL + "DeleteLibrary", library)
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


