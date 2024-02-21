import { Component, Inject, OnInit } from "@angular/core";
import { Client } from "../../../models/customer";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { WarningDialogComponent } from "../../warning-dialog/warning-dialog.component";

@Component({
    templateUrl: 'client-dialog.component.html',
    styleUrls: ['./client-dialog.component.scss']
})
export class ClientDialogComponent implements OnInit{
    client: Client = new Client();
    form: FormGroup = this._fb.group({});

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        private _matDialog: MatDialog,
        private _matDialogRef: MatDialogRef<ClientDialogComponent>,
        private _fb: FormBuilder) {}

    ngOnInit(): void {
        this.client = this.data.client;
        this.form = this.createForm();
    }

    private createForm(): FormGroup {
        return this._fb.group({
            id: [this.client.id],
            lastName: [this.client.lastName, [Validators.required, Validators.pattern('^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґыЫёЁa-zA-Z]+$')]],
            firstName: [this.client.firstName, [Validators.required, Validators.pattern('^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґыЫёЁa-zA-Z]+$')]],
            email: [this.client.email, [Validators.required, Validators.email]],
            passportNumber: [this.client.passportNumber, [Validators.required, Validators.minLength(5)]],
            isRegularFrom: [this.client.isRegularFrom],
            isRegular: [this.client.isRegular || false],
            phoneNumber: [this.client.phoneNumber, [Validators.required, Validators.minLength(10)]]
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
    const dialogRef = this._matDialog.open(WarningDialogComponent, {
        disableClose: true,
        width: '400px'
    });
    dialogRef.componentInstance.message = 'Ви впевнені, що хочете видалити клієнта? Після підтвердження відмінити цю дію буде неможливо.'; 
    dialogRef.afterClosed().subscribe((res: boolean) => {
        if (res) {
            this.data.deleteClient(this.client.id);
            this._matDialogRef.close();
        }
    })
   }
}