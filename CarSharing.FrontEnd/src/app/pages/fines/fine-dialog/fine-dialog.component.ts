import { Component, Inject, OnInit } from "@angular/core";
import { Fine } from "../../../models/fine";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    templateUrl: 'fine-dialog.component.html',
    styleUrls: ['./fine-dialog.component.scss']
})
export class FineDialogComponent implements OnInit{
    fine: Fine = new Fine();
    form: FormGroup = this._fb.group({});

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        private _matDialogRef: MatDialogRef<FineDialogComponent>,
        private _fb: FormBuilder) {}

    ngOnInit(): void {
        this.fine = this.data.fine;
        this.form = this.createForm();
    }

    private createForm(): FormGroup {
        return this._fb.group({
            id: [this.fine.id || 0],
            description: [this.fine.description, Validators.required],
            price: [this.fine.price, Validators.required]
        });
    }

   onSave(): void {
    if (this.fine.id) {
        this.updateFine();
    }else {
        this.createFine();
    }
    this._matDialogRef.close();
   }

   private updateFine(): void {
    const formValue = this.form.value as Fine;    
    this.data.updateFine(formValue);
   }

   private createFine(): void {
    const formValue = this.form.value as Fine;    
    this.data.createFine(formValue);
   }

   onDelete(): void {
    this.data.deleteFine(this.fine.id);
    this._matDialogRef.close();
   }
}