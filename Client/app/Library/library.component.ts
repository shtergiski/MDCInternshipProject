import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/catch';
import { LibraryService } from '../Services/Library/LibraryService';
import { Observable } from 'rxjs/Observable';
import { Library } from './library';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'my-library',
    templateUrl: './library.component.html'
})
export class LibraryComponent implements OnInit {

    public libraries: Library[];
        currentId: number = 0;

    library: Library = {
        Name: "",
        Address: "",
        City: "",
        LibraryID:""
    };
    errorMessage: any;

    constructor(private _libraryService: LibraryService, private _router: Router, private _activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        if (this._activatedRoute.snapshot.params["id"])
            this.currentId = parseInt(this._activatedRoute.snapshot.params["id"]);
        this.getLibrary();
    }

    getLibrary(): any {
        this._libraryService.getLibraries().subscribe(
            data => this.libraries = data
        )
    }

    add() {
        this._router.navigate(['library/add']);
    }

    edit(id: any) {
        this._router.navigate(['library/edit/' + id])
    }


    editLibrary(library: Library) {
        this._libraryService.editLibrary(library).subscribe(
            data => console.log(data)
        )
    } 
    
    deleteLibrary(library: Library) {
        this.libraries.splice(this.libraries.indexOf(library), 1);
        this._libraryService.deleteLibrary(library).subscribe(
               data=> console.log(data)
        )
    }

    clearData(): void {
        this.library = new Library();
    }

    addLibrary() {
        this._libraryService.addLibrary(this.library).subscribe(
            data => this.libraries.push(data)
        )

        this.library = {
            Name: "",
            Address: "",
            City: "",
            LibraryID:""
        }
    }
  
}
