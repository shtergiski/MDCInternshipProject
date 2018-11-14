import { Component, OnInit } from '@angular/core';
import { BookService } from '../Services/Book/BookService';
import { BookCopies } from './bookCopies';
import { BookCopiesService } from '../Services/BookCopies/BookCopiesService';
import { Book } from '../Book/book';
import { Library } from '../Library/library';
import { LibraryService } from '../Services/Library/LibraryService';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'my-bookCopy',
    templateUrl: './bookCopies.component.html',
})
export class BookCopiesComponent implements OnInit {

    bookCopies: BookCopies[];
    books: Book[];
    libraries: Library[];

    bookCopy: BookCopies = {
        Book: "",
        Library: "",
        NumberOfCopies: "",
        Book1: null,
        Library1: null,
        BookCopiesID:""
    };

    book: Book = {
        Title: "",
        YearOfIssue: "",
        NumberOfPages: "",
        Publisher: "",
        Publisher1: null,
        BookID:""
    }

    library: Library = {
        Name: "",
        Address: "",
        City: "",
        LibraryID:""
    }
    currentId: number = 0;
    constructor(private _bookCopiesService: BookCopiesService, private _bookService: BookService, private _libraryService: LibraryService, private _router: Router, private _activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        if (this._activatedRoute.snapshot.params["id"])
            this.currentId = parseInt(this._activatedRoute.snapshot.params["id"]);
        this.Refresh();
    }


    getBookCopies() {
        this._bookCopiesService.getBookCopies().subscribe(
            data => this.bookCopies = data
        )
    }

    getLibrary() {
        this._libraryService.getLibraries().subscribe(
            data => this.libraries = data
        )
    }

    getBooks() {
        this._bookService.getBooks().subscribe(
            data => this.books = data
        )
    }

    Refresh() {
        this.getBooks();
        this.getBookCopies();
        this.getLibrary();
    }

    add() {
        this._router.navigate(['bookCopies/add']);
    }

    edit(id: any) {
        this._router.navigate(['bookCopies/edit/' + id])
    }

    editBookCopy(bookCopy: BookCopies) {
        this._bookCopiesService.editBookCopy(bookCopy).subscribe(
            data => console.log(data)
        )
    }

    deleteBookCopy(bookCopy: BookCopies) {
        this.bookCopies.splice(this.bookCopies.indexOf(bookCopy), 1);
        this._bookCopiesService.deleteBookCopy(bookCopy).subscribe(
            data => console.log(data)
        )
    }



    //addBookCopy() {
    //    console.log(this.book)
    //    this.bookCopy.Book = this.book.BookID;
    //    //this.bookCopy.Book1 = this.book;

    //    console.log(this.library)
    //    this.bookCopy.Library = this.library.LibraryID;
    //    //this.bookCopy.Library1 = this.library;

    //    this._bookCopiesService.addBookCopy(this.bookCopy).subscribe(
    //        data => {
    //            //this.bookCopies.push(data);
    //            this.Refresh();
    //        }
    //    )

    //    this.bookCopy = {
    //        Book: "",
    //        Library: "",
    //        NumberOfCopies: "",
    //        Book1: null,
    //        Library1: null,
    //        BookCopiesID:""
    //    }
    //}
 
}
