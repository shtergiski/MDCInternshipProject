import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ClientService } from "../../Services/Client/ClientService";

@Component({
    selector: 'my-app',
    templateUrl: './edit.component.html'
})

export class ClientEditComponent implements OnInit {

    clientForm: FormGroup;
    title: string = "Add";
    id: number = 0;
    errorMessage: any;
    submitted: boolean = false;
    _ref: any;

    constructor(private _fb: FormBuilder,
        private _avRoute: ActivatedRoute,
        private _clientService: ClientService,
        private _router: Router) {

        if (this._avRoute.snapshot.params["id"]) {
            this.id = parseInt(this._avRoute.snapshot.params["id"]);
            console.log(this.id);
            this.title = 'Edit';
        }

        this.clientForm = this._fb.group({
            //id: 0,
            Name: "",
            Phone: "",
            Address: "",
            City: "",
            ClientID: ""
        })

    }

    ngOnInit(): void {
        if (this.id > 0) {
            this._clientService.getClientById(this.id)
                .subscribe(resp => this.clientForm.patchValue(resp)
                    , error => this.errorMessage = error);
        }
    }

    save() {
        debugger;
        if (!this.clientForm.valid) {
            this.submitted = true;
            return;
        }

        this._clientService.editClient(this.clientForm.value)
            .subscribe(cliId => {
                //alert('Saved Successfully!')
                this._router.navigate(['client', { id: cliId }]);
            }, error => this.errorMessage = error)
    }

    cancel() {
        this._router.navigate(["client", { id: this.id }]);
    }

    get name() { return this.clientForm.get('name'); }
    get phone() { return this.clientForm.get('phone'); }
    get address() { return this.clientForm.get('address'); }
    get city() { return this.clientForm.get('city'); }
}