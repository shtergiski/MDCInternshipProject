import { Component,OnInit } from '@angular/core';
import { Book } from './book';
import { BookService } from '../Services/Book/BookService';
import { PublisherService } from '../Services/Publisher/PublisherService';
import { Publisher } from '../Publishers/publisher';
import { LibraryService } from '../Services/Library/LibraryService';
import { Library } from '../Library/library';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'my-book',
    templateUrl: './book.component.html',
})
export class BookComponent implements OnInit {

    books: Book[];
    publishers: Publisher[];

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
    currentId: number = 0;

    constructor(private _bookService: BookService, private _publisherService: PublisherService, private _router: Router, private _activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        if (this._activatedRoute.snapshot.params["id"])
            this.currentId = parseInt(this._activatedRoute.snapshot.params["id"]);
        this.Refresh();
    }

  
    getPublishers() {
        this._publisherService.getPublishers().subscribe(
            pub => this.publishers = pub
        )

    }

    getBooks() {
        this._bookService.getBooks().subscribe(
            data => this.books = data
        )
    }

    Refresh() {
        this.getBooks();
        this.getPublishers();
    }

    add() {
        this._router.navigate(['book/add']);
    }

    edit(id: any) {
        this._router.navigate(['book/edit/' + id])
    }

    editBook(book: Book) {
        this._bookService.editBook(book).subscribe(
            data => console.log(data)
        )

    } 

    deleteBook(book: Book) {
        this.books.splice(this.books.indexOf(book), 1);
        this._bookService.deleteBook(book).subscribe(
            data => console.log(data)
        )
    }

    //addBook() {
    //    console.log(this.publisher)
    //    this.book.Publisher = this.publisher.PublisherID;
    //    //this.book.Publisher1 = this.publisher;

    //    this._bookService.addBook(this.book).subscribe(
    //        data => {
    //            //this.books.push(data);
    //            this.Refresh();
    //        }
    //    )

    //    this.book = {
    //        Title: "",
    //        YearOfIssue: "",
    //        NumberOfPages: "",
    //        Publisher: "",
    //        Publisher1: null,
    //        BookID:""
    //    }
    //}
}
