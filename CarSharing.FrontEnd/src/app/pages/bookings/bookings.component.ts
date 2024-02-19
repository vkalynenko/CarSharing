import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { Booking, CreateBooking } from '../../models/reservation';
import { BookingService } from '../../services/booking.service';
import { BookingDialogComponent } from './booking-dialog/booking-dialog.component';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  @ViewChild('bookingTableRef') table: any;

  bookings: Booking[] = [];

  displayedColumns: string[] = ['car', 'client', 'startDate', 'expectedReturnDate', 
    'actualReturnDate', 'totalSum'];

  unSubscribeAll = new Subject();

  constructor(private bookingsService: BookingService,
    private _matDialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.bookingsService.getAllBookings().pipe(takeUntil(this.unSubscribeAll))
      .subscribe((bookings: Booking[]) => this.bookings = bookings);
  }

  addBooking(): void {
    this.showDetails(new Booking());
  }

  showDetails(row: Booking): void {
    this._matDialog.open(BookingDialogComponent, {
      minWidth: '200px',
      closeOnNavigation: true,
      autoFocus: false,
      disableClose: true,
      data: {
        booking: row,
        deleteBooking: this.deleteBooking.bind(this),
        updateBooking: this.updateBooking.bind(this),
        createBooking: this.createBooking.bind(this)
      }
    });
  }

  deleteBooking(id: number): void {
    this.bookingsService.deleteBooking(id).subscribe(() => {
      this.bookings = this.bookings.filter(c => c.id !== id);
      this.table.renderRows();

      this.showMessage('Бронювання було видалено');
    }, 
    () => this.showMessage('Шось пішло не так...'));
  }

  updateBooking(booking: Booking): void {
    this.bookingsService.updateBooking(booking).subscribe(() => {
      const bookingIndex = this.bookings.findIndex(x => x.id === booking.id);
      this.bookings[bookingIndex] = {...this.bookings[bookingIndex], ...booking};
      this.table.renderRows();
  
      this.showMessage('Бронювання було відредаговано')
    }, 
    () => this.showMessage('Шось пішло не так...'));
  }

  createBooking(booking: CreateBooking): void {
    this.bookingsService.createBooking(booking).subscribe(() => {
      this.bookingsService.getAllBookings().subscribe((bookings: Booking[]) => {
        this.bookings = bookings;
        this.table.renderRows();
        this.showMessage('Бронювання було додано')
      }, () => this.showMessage('Шось пішло не так...'));
    }, 
    () => this.showMessage('Шось пішло не так...'));
  }

  private showMessage(message: string): void {
    this._snackBar.open(message);
  }
}
