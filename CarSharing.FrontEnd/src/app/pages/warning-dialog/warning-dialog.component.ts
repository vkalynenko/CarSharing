import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    templateUrl: 'warning-dialog.component.html',
    styleUrls: ['./warning-dialog.component.scss']
})
export class WarningDialogComponent {
    public title: string = 'Попередження';
    public message: string = '';

    constructor(
        public dialogRef: MatDialogRef<WarningDialogComponent>
    )
    { }
}