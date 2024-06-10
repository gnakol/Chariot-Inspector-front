import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginFormGroup.valid) {
      const { username, password } = this.loginFormGroup.value;
      this.authService.login(username, password).subscribe(
        token => {
          console.log('JWT Token:', token);
          this.router.navigateByUrl("/dashboard");
        },
        error => {
          console.error('Authentication failed:', error);
        }
      );
    }
  }
}
