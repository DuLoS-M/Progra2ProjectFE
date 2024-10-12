import { Component, OnInit } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../shared/service/user.service';
import type { User } from '../../../shared/types/types';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [DataViewModule, ButtonModule, CommonModule, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  constructor(private userService: UserService) {}
  users: User[] = [];

  ngOnInit() {
    this.userService.getUserList().subscribe((data) => {
      this.users = data;
    });
  }
}
