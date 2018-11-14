import { OnInit, Component } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { BookService } from "../../Services/Book/BookService";
import { ActivatedRoute, Router } from "@angular/router";
import { Publisher } from "../../Publishers/publisher";
import { Book } from "../book";
import { PublisherService } from "../../Services/Publisher/PublisherService";

@Component({
    selector: 'my-app',
    templateUrl: './edit.component.html'
})

export class BookEditComponent implements OnInit {

    publishers: Publisher[];
    books: Book[];

    bookForm: FormGroup;
    title1: string = "Add";
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
    publisher: Publisher = {
        Name: "",
        Country: "",
        PublisherID: ""
    };

    constructor(private _fb: FormBuilder,
        private _avRoute: ActivatedRoute,
        private _bookService: BookService,
        private _publisherService: PublisherService,
        private _router: Router) {

        if (this._avRoute.snapshot.params["id"]) {
            this.id = parseInt(this._avRoute.snapshot.params["id"]);
            console.log(this.id);
            this.title1 = 'Edit';
        }

        this.bookForm = this._fb.group({
            //id: 0,
            Title: "",
            YearOfIssue: "",
            NumberOfPages: "",
            BookID: "",
            Publisher: "",
            //Publisher1: null
        })

    }


    ngOnInit(): void {
        if (this.id > 0) {
            this._bookService.getBookById(this.id)
                .subscribe(resp => this.bookForm.patchValue(resp)
                    , error => this.errorMessage = error);
        }
        this.getPublishers();
    }

    getPublishers() {
        this._publisherService.getPublishers().subscribe(
            pub => this.publishers = pub
        )
    }
    //}
    //getBooks() {
    //    this._bookService.getBooks().subscribe(
    //        data => this.books = data
    //    )
    //}
    //Refresh() {
    //    this.getPublishers();
    //    this.getBooks();
    //}
    save() {
        debugger;
        if (!this.bookForm.valid) {
            this.submitted = true;
            return;
        }

        this._bookService.editBook(this.bookForm.value)
            .subscribe(bookId => {
                //alert('Saved Successfully!')
                this._router.navigate(['book', { id: bookId }]);
            }, error => this.errorMessage = error)
    }

    cancel() {
        this._router.navigate(["book", { id: this.id }]);
    }

    get title() { return this.bookForm.get('title'); }
    get yearOfIssue() { return this.bookForm.get('yearOfIssue'); }
    get numberOfPages() { return this.bookForm.get('numberOfPages'); }
    get publisherrr() { return this.bookForm.get('publisher'); }
}