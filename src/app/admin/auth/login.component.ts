import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { UserService } from '../../shared/service/user.service';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextModule, ButtonModule, CardModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}
  formGroup!: FormGroup;

  onSubmit() {
    if (this.formGroup.valid) {
      const { email, password } = this.formGroup.value;
      const res = this.userService
        .login({ email: email, password, role: 'ADMIN' })
        .subscribe((res) => {
          console.log('Login success');
          console.log({ res });
          this.router.navigate(['/dish']);
          localStorage.setItem('userId', res.id!.toString());
        });
    }
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
}
