import { Component, OnInit, ViewChild } from '@angular/core';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CarDialogComponent } from './car-dialog/car-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  @ViewChild('carTableRef') table: any;

  cars: Car[] = [];

  displayedColumns: string[] = ['brand', 'model', 'releaseYear', 'gearBox', 'seatsQuantity',
    'dailyRentalPrice', 'isInUse',];

  unSubscribeAll = new Subject();

  constructor(private carsService: CarService,
    private _matDialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.carsService.getAllCars().pipe(takeUntil(this.unSubscribeAll))
      .subscribe((cars: Car[]) => this.cars = cars);
  }

  addCar(): void {
    this.showDetails(new Car());
  }

  showDetails(row: Car): void {
    this._matDialog.open(CarDialogComponent, {
      minWidth: '200px',
      closeOnNavigation: true,
      autoFocus: false,
      disableClose: false,
      data: {
        car: row,
        deleteCar: this.deleteCar.bind(this),
        updateCar: this.updateCar.bind(this),
        createCar: this.createCar.bind(this)
      }
    });
  }

  deleteCar(id: number): void {
    this.carsService.deleteCar(id).subscribe(() => {
      this.cars = this.cars.filter(c => c.id !== id);
      this.table.renderRows();

      this.showMessage('Машину було видалено');
    }, 
    () => this.showMessage('Шось пішло не так...'));
  }

  updateCar(car: Car): void {
    this.carsService.updateCar(car).subscribe(() => {
      const carIndex = this.cars.findIndex(x => x.id === car.id);
      this.cars[carIndex] = {...this.cars[carIndex], ...car};
      this.table.renderRows();
  
      this.showMessage('Машину було відредаговано')
    }, 
    () => this.showMessage('Шось пішло не так...'));
  }

  createCar(car: Car): void {
    this.carsService.createCar(car).subscribe((id: number) => {
      car.id = id;
      this.cars.push(car);
      this.table.renderRows();

      this.showMessage('Машину було додано')
    }, 
    () => this.showMessage('Шось пішло не так...'));
  }

  private showMessage(message: string): void {
    this._snackBar.open(message);
  }
}
