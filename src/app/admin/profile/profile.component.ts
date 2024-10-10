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
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  providers: [MessageService],
})
export class ProfileComponent implements OnInit {
  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  passwordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private userService: UserService
  ) {
    this.passwordForm = this.fb.group({
      // currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

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

      // Call your service to change the password here
      // Example:
      // this.authService.changePassword(currentPassword, newPassword).subscribe(
      //   response => {
      //     this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password changed successfully' });
      //   },
      //   error => {
      //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to change password' });
      //   }
      // );

      this.userService
        .updatePassword(localStorage.getItem('userId')!, newPassword)
        .subscribe((res) => {
          console.log('Password changed successfully');
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Password changed successfully',
          });

          this.passwordForm.reset();
        });
    }
  }
}
