import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../models/customer';
import { ClientDialogComponent } from './client-dialog/client-dialog.component';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  @ViewChild('clientTableRef') table: any;

  clients: Client[] = [];

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phoneNumber', 'isRegular'];

  unSubscribeAll = new Subject();

  constructor(private clientsService: ClientService,
    private _matDialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.clientsService.getAllClients().pipe(takeUntil(this.unSubscribeAll))
      .subscribe((clients: Client[]) => this.clients = clients);
  }

  addClient(): void {
    this.showDetails(new Client());
  }

  showDetails(row: Client): void {
    this._matDialog.open(ClientDialogComponent, {
      minWidth: '200px',
      closeOnNavigation: true,
      autoFocus: false,
      disableClose: false,
      data: {
        client: row,
        deleteClient: this.deleteClient.bind(this),
        updateClient: this.updateClient.bind(this),
        createClient: this.createClient.bind(this)
      }
    });
  }

  deleteClient(id: number): void {
    this.clientsService.deleteClient(id).subscribe(() => {
      this.clients = this.clients.filter(c => c.id !== id);
      this.table.renderRows();

      this.showMessage('Клієнта було видалено');
    }, 
    () => this.showMessage('Шось пішло не так...'));
  }

  updateClient(client: Client): void {
    this.clientsService.updateClient(client).subscribe(() => {
      const clientIndex = this.clients.findIndex(x => x.id === client.id);
      this.clients[clientIndex] = {...this.clients[clientIndex], ...client};
      this.table.renderRows();
  
      this.showMessage('Клієнта було відредаговано')
    }, 
    () => this.showMessage('Шось пішло не так...'));
  }

  createClient(client: Client): void {
    this.clientsService.createClient(client).subscribe((id: number) => {
      client.id = id;
      this.clients.push(client);
      this.table.renderRows();

      this.showMessage('Клієнта було додано')
    }, 
    () => this.showMessage('Шось пішло не так...'));
  }

  private showMessage(message: string): void {
    this._snackBar.open(message);
  }
}
