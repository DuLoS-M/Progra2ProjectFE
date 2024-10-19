import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../shared/service/user.service';
import { User } from '../../shared/types/types';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService],
})
export class ProfileComponent implements OnInit {
  user: User = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    nit: '',
    role: '',
  };

  passwordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private userService: UserService
  ) {
    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const userId = parseInt(localStorage.getItem('userId')!);
    if (userId) {
      this.userService.getUser(userId).subscribe(
        (user) => {
          this.user = user;
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to fetch user data',
          });
        }
      );
    }
  }

  onChangePassword(): void {
    if (this.passwordForm.valid) {
      const { newPassword, confirmPassword } = this.passwordForm.value;
      if (newPassword !== confirmPassword) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'New passwords do not match',
        });
        return;
      }

      this.userService
        .updatePassword(localStorage.getItem('userId')!, newPassword)
        .subscribe(
          (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Password changed successfully',
            });
            this.passwordForm.reset();
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to change password',
            });
          }
        );
    }
  }
}
