import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private _fb: FormBuilder) { }

  ngOnInit() {
    
  }
}
