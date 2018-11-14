import { Component, OnInit } from '@angular/core';
import { Publisher } from './publisher';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { PublisherService } from '../Services/Publisher/PublisherService';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'my-publisher',
    templateUrl: './publisher.component.html',
})
export class PublisherComponent implements OnInit {

    publishers: Publisher[];
    publisher: Publisher = {
        Name: "",
        Country: "",
        PublisherID: ""

    };
    errorMessage: any;
    currentId: number = 0;

    constructor(private _publisherService: PublisherService, private _router: Router, private _activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        if (this._activatedRoute.snapshot.params["id"])
            this.currentId = parseInt(this._activatedRoute.snapshot.params["id"]);
        this.getPublishers();
        
    }

    getPublishers() {
        this._publisherService.getPublishers().subscribe(
            data => this.publishers = data)
    }

    add() {
        this._router.navigate(['publishers/add']);
    }

    edit(id: any) {
        this._router.navigate(['publishers/edit/' + id])
    }


    editPublisher(publisher: Publisher) {
        this._publisherService.editPublisher(publisher).subscribe(
            data => console.log(data)
        )
    } 

    deletePublisher(publisher: Publisher) {
        this.publishers.splice(this.publishers.indexOf(publisher), 1);
        this._publisherService.deletePublisher(publisher).subscribe(
            data => console.log(data)
        )
    }

    
    addPublisher() {
        this._publisherService.addPublisher(this.publisher).subscribe(
            data => this.publishers.push(data)
        )

        this.publisher = {
            Name: "",
            Country: "",
            PublisherID:""
        }
    }
}
