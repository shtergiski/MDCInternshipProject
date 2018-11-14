import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PublisherService } from "../../Services/Publisher/PublisherService";

@Component({
    selector: 'my-app',
    templateUrl: './edit.component.html'
})

export class PublisherEditComponent implements OnInit {

    publisherForm: FormGroup;
    title: string = "Add";
    id: number = 0;
    errorMessage: any;
    submitted: boolean = false;
    _ref: any;

    constructor(private _fb: FormBuilder,
        private _avRoute: ActivatedRoute,
        private _publisherService: PublisherService,
        private _router: Router) {

        if (this._avRoute.snapshot.params["id"]) {
            this.id = parseInt(this._avRoute.snapshot.params["id"]);
            console.log(this.id);
            this.title = 'Edit';
        }

        this.publisherForm = this._fb.group({
            Name: "",
            Country: "",
            PublisherID:""
        })

    }

    ngOnInit(): void {
        if (this.id > 0) {
            this._publisherService.getPublishersById(this.id)
                .subscribe(resp => this.publisherForm.patchValue(resp)
                    , error => this.errorMessage = error);
        }
    }

    save() {
        if (!this.publisherForm.valid) {
            this.submitted = true;
            return;
        }

        this._publisherService.editPublisher(this.publisherForm.value)
            .subscribe(pubId => {
                //alert('Saved Successfully!')
                this._router.navigate(['publishers', { id: pubId }]);
            }, error => this.errorMessage = error)
    }

    cancel() {
        this._router.navigate(["publishers", { id: this.id }]);
    }

    get name() { return this.publisherForm.get('name'); }
    get country() { return this.publisherForm.get('country'); }
}