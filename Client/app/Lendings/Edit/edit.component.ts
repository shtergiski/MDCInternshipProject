import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LendingService } from '../../Services/Lendings/LendingService';
import { ClientService } from '../../Services/Client/ClientService';
import { BookService } from '../../Services/Book/BookService';
import { Book } from '../../Book/book';
import { Client } from '../../Clients/client';

@Component({
    selector: 'my-app',
    templateUrl: './edit.component.html',
})

export class LendingEditComponent implements OnInit {

    lendingForm: FormGroup;
    title: string = "Add";
    id: number = 0;
    errorMessage: any;
    submitted: boolean = false;
    _ref: any;

    books: Book[];
    clients: Client[];

    client: Client = {
        Name: "",
        Phone: "",
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

    constructor(private _fb: FormBuilder,
        private _avRoute: ActivatedRoute,
        private _lendingService: LendingService,
        private _router: Router,
        private _clientService: ClientService,
        private _bookService: BookService) {

        if (this._avRoute.snapshot.params["id"]) {
            this.id = parseInt(this._avRoute.snapshot.params["id"]);
            console.log(this.id);
            this.title = 'Edit';
        }

        this.lendingForm = this._fb.group({
            //id: 0,
            Book: "",
            Client: "",
            DateOfLending: "",
            DateOfReturn: "",
            //Book1: null,
            //Client1: null,
            LendingID:""
        })
    }

    ngOnInit(): void {

        if (this.id > 0) {
            this._lendingService.getLendingById(this.id)
                .subscribe(resp => this.lendingForm.patchValue(resp)
                    , error => this.errorMessage = error);
        }
        this.Refresh();
    }

    getClients() {
        this._clientService.getClients().subscribe(
        data => this.clients = data)
        
    }

    getBooks() {
        this._bookService.getBooks().subscribe(
            data => this.books = data)
    }

    Refresh() {
        this.getBooks();
        this.getClients();
    }

    save() {
        debugger;
        if (!this.lendingForm.valid) {
            this.submitted = true;
            return;
        }

        this._lendingService.editLending(this.lendingForm.value)
            .subscribe(lendId => {
                //alert('Saved Successfully!')
                this._router.navigate(['lending', { id: lendId }]);
            }, error => this.errorMessage = error)
    }

    cancel() {
        this._router.navigate(["lending", { id: this.id }]);
    }

    get books1() { return this.lendingForm.get('Book'); }
    get clients1() { return this.lendingForm.get('Client'); }
    get dateOfLending() { return this.lendingForm.get('DateOfLending'); }
    get dateOfReturn() { return this.lendingForm.get('DateOfReturn'); }
    //get book1() { return this.lendingForm.get('Book1'); }
    //get client1() { return this.lendingForm.get('Client1'); }
    //get lendingID() { return this.lendingForm.get('LendingID'); }


}