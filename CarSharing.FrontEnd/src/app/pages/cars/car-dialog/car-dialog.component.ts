import { Component, Inject, OnInit } from "@angular/core";
import * as dialog from '@angular/material/dialog';
import { Car } from "../../../models/car";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    templateUrl: './car-dialog.component.html',
    styleUrls : ['./car-dialog.component.scss']
})
export class CarDialogComponent implements OnInit {
    car: Car = new Car();
    form: FormGroup = this._fb.group({});

    constructor(@Inject(dialog.MAT_DIALOG_DATA) public data: any,
        private _matDialogRef: MatDialogRef<CarDialogComponent>,
        private _fb: FormBuilder) {}

    ngOnInit(): void {
        this.car = this.data.car;
        this.form = this.createForm();
    }

    private createForm(): FormGroup {
        return this._fb.group({
            id: [this.car.id],
            model: [this.car.model, Validators.required],
            brand: [this.car.brand, Validators.required],
            releaseYear: [this.car.releaseYear, Validators.required],
            isInUse: [this.car.isInUse || false],
            gearBox: [this.car.gearBox, Validators.required],
            seatsQuantity: [this.car.seatsQuantity, [Validators.required, Validators.min(1)]],
            dailyRentalPrice: [this.car.dailyRentalPrice, [Validators.required]]
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
    this.data.deleteCar(this.car.id);
    this._matDialogRef.close();
   }
}