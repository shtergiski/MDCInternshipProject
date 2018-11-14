import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BookCopiesService } from "../../Services/BookCopies/BookCopiesService";
import { BookService } from "../../Services/Book/BookService";
import { LibraryService } from "../../Services/Library/LibraryService";
import { Book } from "../../Book/book";
import { Library } from "../../Library/library";

@Component({
    selector: 'my-app',
    templateUrl: './edit.component.html'
})

export class BookCopiesEditComponent implements OnInit {

    books: Book[];
    libraries: Library[];

    bookCpsForm: FormGroup;
    title: string = "Add";
    id: number = 0;
    errorMessage: any;
    submitted: boolean = false;
    _ref: any;

    book: Book = {
        Title: "",
        YearOfIssue: "",
        NumberOfPages: "",
        Publisher: "",
        Publisher1: null,
        BookID: ""
    };

    library: Library = {
        Name: "",
        Address: "",
        City: "",
        LibraryID: ""
    };

    constructor(private _fb: FormBuilder,
        private _avRoute: ActivatedRoute,
        private _bookCopiesService: BookCopiesService,
        private _bookService: BookService,
        private _libraryService: LibraryService,
        private _router: Router) {

        if (this._avRoute.snapshot.params["id"]) {
            this.id = parseInt(this._avRoute.snapshot.params["id"]);
            console.log(this.id);
            this.title = 'Edit';
        }

        this.bookCpsForm = this._fb.group({
            //id: 0,
            Book: "",
            Library: "",
            NumberOfCopies: "",
            BookCopiesID: "",
            //Book1: null,
            //Library1: null
            
        })

    }

    ngOnInit(): void {
        if (this.id > 0) {
            this._bookCopiesService.getBookCopiesById(this.id)
                .subscribe(resp => this.bookCpsForm.patchValue(resp)
                    , error => this.errorMessage = error);
        }
        this.Refresh();
    }

    getBooks() {
        this._bookService.getBooks().subscribe(
            data => this.books = data
        )
    }

    getLibraries() {
        this._libraryService.getLibraries().subscribe(
            data => this.libraries = data
        )
    }
    Refresh() {
        this.getLibraries();
        this.getBooks();
    }

    save() {
        debugger;
        if (!this.bookCpsForm.valid) {
            this.submitted = true;
            return;
        }

        this._bookCopiesService.editBookCopy(this.bookCpsForm.value)
            .subscribe(copyId => {
                //alert('Saved Successfully!')
                this._router.navigate(['bookCopies', { id: copyId }]);
            }, error => this.errorMessage = error)
    }

    cancel() {
        this._router.navigate(["bookCopies", { id: this.id }]);
    }

    get bookss() { return this.bookCpsForm.get('book'); }
    get libraryy() { return this.bookCpsForm.get('library'); }
    get numberOfCopies() { return this.bookCpsForm.get('numberOfCopies'); }
    //get book1() { return this.bookCpsForm.get('book1'); }
    //get library1() { return this.bookCpsForm.get('library1'); }
}