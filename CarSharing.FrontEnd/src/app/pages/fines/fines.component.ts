import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fines',
  templateUrl: './fines.component.html',
  styleUrls: ['./fines.component.scss']
})
export class FinesComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private _fb: FormBuilder) { }

  ngOnInit() {
    
  }
}
