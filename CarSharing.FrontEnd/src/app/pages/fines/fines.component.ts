import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { Fine } from '../../models/fine';
import { FineService } from '../../services/fine.service';
import { FineDialogComponent } from './fine-dialog/fine-dialog.component';

@Component({
  selector: 'app-fines',
  templateUrl: './fines.component.html',
  styleUrls: ['./fines.component.scss']
})
export class FinesComponent implements OnInit {
  @ViewChild('fineTableRef') table: any;

  fines: Fine[] = [];

  displayedColumns: string[] = ['description', 'price'];

  unSubscribeAll = new Subject();

  constructor(private finesService: FineService,
    private _matDialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.finesService.getAllFines().pipe(takeUntil(this.unSubscribeAll))
      .subscribe((fines: Fine[]) => this.fines = fines);
  }

  addFine(): void {
    this.showDetails(new Fine());
  }

  showDetails(row: Fine): void {
    this._matDialog.open(FineDialogComponent, {
      minWidth: '200px',
      closeOnNavigation: true,
      autoFocus: false,
      disableClose: false,
      data: {
        fine: row,
        deleteFine: this.deleteFine.bind(this),
        updateFine: this.updateFine.bind(this),
        createFine: this.createFine.bind(this)
      }
    });
  }

  deleteFine(id: number): void {
    this.finesService.deleteFine(id).subscribe(() => {
      this.fines = this.fines.filter(c => c.id !== id);
      this.table.renderRows();

      this.showMessage('Штраф було видалено');
    }, 
    () => this.showMessage('Шось пішло не так...'));
  }

  updateFine(fine: Fine): void {
    this.finesService.updateFine(fine).subscribe(() => {
      const fineIndex = this.fines.findIndex(x => x.id === fine.id);
      this.fines[fineIndex] = {...this.fines[fineIndex], ...fine};
      this.table.renderRows();
  
      this.showMessage('Штраф було відредаговано')
    }, 
    () => this.showMessage('Шось пішло не так...'));
  }

  createFine(fine: Fine): void {
    this.finesService.createFine(fine).subscribe((id: number) => {
      fine.id = id;
      this.fines.push(fine);
      this.table.renderRows();

      this.showMessage('Штраф було додано')
    }, 
    () => this.showMessage('Шось пішло не так...'));
  }

  private showMessage(message: string): void {
    this._snackBar.open(message);
  }
}
