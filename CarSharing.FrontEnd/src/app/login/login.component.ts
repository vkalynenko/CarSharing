import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from '../models/login';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(private authService: AuthService, 
    private userService: UserService,
    private _fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  login(): void {
    const formValue = this.loginForm.value;
    const loginModel = new LoginModel(formValue.email, formValue.password);
    this.authService.login(loginModel).subscribe((user: User) => {
      localStorage.setItem('currentUser', JSON.stringify(user));
    });
  }
}
