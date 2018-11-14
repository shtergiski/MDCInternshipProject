import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LibraryService } from "../../Services/Library/LibraryService";

@Component({
    selector: 'my-app',
    templateUrl: './edit.component.html'
})

export class LibraryEditComponent implements OnInit {

    libraryForm: FormGroup;
    title: string = "Add";
    id: number = 0;
    errorMessage: any;
    submitted: boolean = false;
    _ref: any;

    constructor(private _fb: FormBuilder,
        private _avRoute: ActivatedRoute,
        private _libraryService: LibraryService,
        private _router: Router) {

        if (this._avRoute.snapshot.params["id"]) {
            this.id = parseInt(this._avRoute.snapshot.params["id"]);
            console.log(this.id);
            this.title = 'Edit';
        }

        this.libraryForm = this._fb.group({
            //id: 0,
            Name: "",
            City: "",
            Address: "",
            LibraryID:""
        })

    }

    ngOnInit(): void {
        if (this.id > 0) {
            this._libraryService.getLibraryById(this.id)
                .subscribe(resp => this.libraryForm.patchValue(resp)
                    , error => this.errorMessage = error);
        }
    }

    save() {
        debugger;
        if (!this.libraryForm.valid) {
            this.submitted = true;
            return;
        }

        this._libraryService.editLibrary(this.libraryForm.value)
            .subscribe(libId => {
                //alert('Saved Successfully!')
                this._router.navigate(['library', { id: libId }]);
            }, error => this.errorMessage = error)

    }

    cancel() {
        this._router.navigate(["library", { id: this.id }]);
    }

    get name() { return this.libraryForm.get('Name'); }
    get city() { return this.libraryForm.get('City'); }
    get address() { return this.libraryForm.get('Address'); }

}
