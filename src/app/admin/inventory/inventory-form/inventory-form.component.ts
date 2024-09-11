import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { InventoryService } from '../../../shared/service/inventory.service';
import { Validators } from '@angular/forms';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-inventory-form',
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
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss'],
})
export class InventoryFormComponent {
  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}
  inventoryService: InventoryService = inject(InventoryService);
  formGroup!: FormGroup;
  selectedId!: number;

  onSubmit() {
    if (this.selectedId) {
      this.inventoryService
        .updateInventory(this.selectedId, this.formGroup.value)
        .subscribe(
          (data) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Ingredient updated',
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update ingredient',
            });
          }
        );
      return;
    }

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

    this.route.paramMap
      .pipe(
        switchMap((params: any): any => {
          this.selectedId = Number(params.get('id'));
          return this.inventoryService.getInventoryIngredient(this.selectedId);
        })
      )
      .subscribe(
        (ingredient: any) => {
          console.log({ ingredient });
          this.formGroup.patchValue(ingredient);
        },
        (error) => {
          console.error('Error fetching ingredient:', error);
        }
      );
  }
}
