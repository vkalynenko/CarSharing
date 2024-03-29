import { Component, Inject, OnInit } from "@angular/core";
import * as dialog from '@angular/material/dialog';
import { Car } from "../../../models/car";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { WarningDialogComponent } from "../../warning-dialog/warning-dialog.component";

@Component({
    templateUrl: './car-dialog.component.html',
    styleUrls : ['./car-dialog.component.scss']
})
export class CarDialogComponent implements OnInit {
    car: Car = new Car();
    form: FormGroup = this._fb.group({});

    constructor(@Inject(dialog.MAT_DIALOG_DATA) public data: any,
        private _matDialogRef: MatDialogRef<CarDialogComponent>,
        private _matDialog: MatDialog,
        private _fb: FormBuilder) {}

    ngOnInit(): void {
        this.car = this.data.car;
        this.form = this.createForm();
    }

    private createForm(): FormGroup {
        return this._fb.group({
            id: [this.car.id],
            model: [this.car.model, [Validators.required]],
            brand: [this.car.brand, [Validators.required, Validators.pattern('^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґыЫёЁa-zA-Z]+$')]],
            releaseYear: [this.car.releaseYear, [Validators.required, Validators.min(1900), Validators.max(2024)]],
            isInUse: [this.car.isInUse || false],
            gearBox: [this.car.gearBox, [Validators.required, Validators.pattern('^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґыЫёЁa-zA-Z]+$')]],
            seatsQuantity: [this.car.seatsQuantity, [Validators.required, Validators.min(1)]],
            dailyRentalPrice: [this.car.dailyRentalPrice, [Validators.required, Validators.min(1)]]
        });
    }

   onSave(): void {
    if (this.car.id) {
        this.updateCar();
    }else {
        this.createCar();
    }
    this._matDialogRef.close();
   }

   private updateCar(): void {
    const formValue = this.form.value as Car;
    this.data.updateCar(formValue);
   }

   private createCar(): void {
    const formValue = this.form.value as Car;
    this.data.createCar(formValue);
   }

   onDelete(): void {
    const dialogRef = this._matDialog.open(WarningDialogComponent, {
        disableClose: true,
        width: '400px'
    });
    dialogRef.componentInstance.message = 'Ви впевнені, що хочете видалити машину? Після підтвердження відмінити цю дію буде неможливо.';
    dialogRef.afterClosed().subscribe((res: boolean) => {
        if (res) {
            this.data.deleteCar(this.car.id);
            this._matDialogRef.close();
        }
    })
   }
}
