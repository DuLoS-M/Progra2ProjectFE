import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { InventoryService } from '../../../shared/service/inventory.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-news-form',
  standalone: true,
  imports: [
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    MultiSelectModule,
    RouterLink,
    FileUploadModule,
    ToastModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [MessageService],
  templateUrl: './news-form.component.html',
  styleUrl: './news-form.component.scss',
})
export class NewsFormComponent {
  constructor(private messageService: MessageService) {}
  inventoryService: InventoryService = inject(InventoryService);
  formGroup!: FormGroup;

  onSubmit() {
    console.log(this.formGroup.value);
    this.inventoryService
      .addInventoryIngredient(this.formGroup.value)
      .subscribe(
        (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Ingredient added',
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to add ingredient',
          });
        }
      );
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      quantity: new FormControl<number | null>(null, Validators.required),
      name: new FormControl<string | null>(null, Validators.required),
      unit: new FormControl<string | null>(null, Validators.required),
    });
  }
}
