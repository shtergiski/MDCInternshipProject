import { Component, OnInit } from '@angular/core';
import { Lending } from './lending';
import { LendingService } from '../Services/Lendings/LendingService';
import { Book } from '../Book/book';
import { Client } from '../Clients/client';
import { ClientService } from '../Services/Client/ClientService';
import { BookService } from '../Services/Book/BookService';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'my-app',
    templateUrl: './lending.component.html',
})
export class LendingComponent implements OnInit {

    lendings: Lending[];
    books: Book[];
    clients: Client[];
    currentId: number = 0;

    lending: Lending = {
        Book: "",
        Client: "",
        DateOfLending: "",
        DateOfReturn: "",
        Client1: null,
        Book1: null,
        LendingID:""
    };

    client: Client = {
        Name: "",
        Phone:"",
        Address: "",
        City: "",
        ClientID: ""
    }

    book: Book = {
        Title: "",
        YearOfIssue: "",
        NumberOfPages: "",
        Publisher: "",
        Publisher1: null,
        BookID: ""
    }
    errorMessage: any;
  

    constructor(private _lendingService: LendingService,
        private _clientService: ClientService,
        private _bookService: BookService,
        private _router: Router, private _activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        if (this._activatedRoute.snapshot.params["id"])
            this.currentId = parseInt(this._activatedRoute.snapshot.params["id"]);
        this.Refresh();
    }


    getClients() {
        this._clientService.getClients().subscribe(
            data => this.clients = data
        )
    }

    getBooks() {
        this._bookService.getBooks().subscribe(
            data => this.books = data
        )
    }

    getLendings() {
        this._lendingService.getLending().subscribe(
            data => this.lendings = data
        )
    }

    Refresh() {
        this.getBooks();
        this.getClients();
        this.getLendings();
    }

    add() {
        this._router.navigate(['lending/add']);
    }

    edit(id: any) {
        this._router.navigate(['lending/edit/' + id])
    }

   

    editLending(lending: Lending) {
        this._lendingService.editLending(lending).subscribe(
            data => console.log(data)
        )
    }

    deleteLending(lending: Lending) {
        this.lendings.splice(this.lendings.indexOf(lending), 1);
        this._lendingService.deleteLending(lending).subscribe(
            data => console.log(data)
        )
    }


///*    addLending()*/ {
//        console.log(this.book)
//        this.lending.Book = this.book.BookID;
//        //this.lending.Book1 = this.book;

//        console.log(this.client)
//        this.lending.Client = this.client.ClientID;
//        //this.lending.Client1 = this.client;

//        this._lendingService.addLending(this.lending).subscribe(
//            data => {
//                //this.lendings.push(data)
//                this.Refresh();
//            }
//        )

//        this.lending = {
//            Book: "",
//            Client: "",
//            DateOfLending: "",
//            DateOfReturn: "",
//            Client1: null,
//            Book1: null,
//            LendingID:""
//        }
//    }

}
