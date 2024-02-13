import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginModel } from '../models/login';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  signUpForm: FormGroup = new FormGroup({});

  constructor(private authService: AuthService, 
    private userService: UserService,
    private _fb: FormBuilder) { }

  ngOnInit() {
    this.signUpForm = this._fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      passwordCopy: [null, [Validators.required]]
    })
  }

  signUp(): void {
   
  }

}
