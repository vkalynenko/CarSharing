import { Component, Inject, OnInit } from "@angular/core";
import { Client } from "../../../models/customer";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    templateUrl: 'client-dialog.component.html',
    styleUrls: ['./client-dialog.component.scss']
})
export class ClientDialogComponent implements OnInit{
    client: Client = new Client();
    form: FormGroup = this._fb.group({});

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        private _matDialogRef: MatDialogRef<ClientDialogComponent>,
        private _fb: FormBuilder) {}

    ngOnInit(): void {
        this.client = this.data.client;
        this.form = this.createForm();
    }

    private createForm(): FormGroup {
        return this._fb.group({
            id: [this.client.id],
            lastName: [this.client.lastName, Validators.required],
            firstName: [this.client.firstName, Validators.required],
            email: [this.client.email, Validators.required],
            isRegular: [this.client.isRegular || false],
            phoneNumber: [this.client.phoneNumber, Validators.required]
        });
    }

   onSave(): void {
    if (this.client.id) {
        this.updateClient();
    }else {
        this.createClient();
    }
    this._matDialogRef.close();
   }

   private updateClient(): void {
    const formValue = this.form.value as Client;    
    this.data.updateClient(formValue);
   }

   private createClient(): void {
    const formValue = this.form.value as Client;    
    this.data.createClient(formValue);
   }

   onDelete(): void {
    this.data.deleteClient(this.client.id);
    this._matDialogRef.close();
   }
}