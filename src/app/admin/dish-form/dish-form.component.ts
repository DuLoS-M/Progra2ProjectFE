import { Component, inject } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DishService } from '../../shared/service/dish.service';
import { InventoryService } from '../../shared/service/inventory.service';
import { Ingredient } from '../../shared/types/types';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

interface City {
  name: string;
  code: string;
}

interface AutoCompleteCompleteEvent {
  query: string;
  originalEvent: Event;
}

interface SelectedIngredients {
  id: number;
  name: string;
  quantity: number;
}
@Component({
  selector: 'app-dish-form',
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
    RouterLink,
    AutoCompleteModule,
    TableModule,
  ],
  providers: [MessageService],
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.scss'],
})
export class DishFormComponent {
  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}
  dishService: DishService = inject(DishService);
  ingredientsService: InventoryService = inject(InventoryService);
  ingredients!: Ingredient[];
  formGroup!: FormGroup;
  ingredientGoup!: FormGroup;
  dishImage!: any;
  selectedId!: number;
  filteredIngredients!: Ingredient[];
  selectedIngredients!: SelectedIngredients[];

  onUpload(event: any) {
    this.dishImage = event.files[0];
    console.log(event);
  }

  onSubmit() {
    if (this.dishImage === undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please select an image',
      });
      return;
    }

    this.formGroup.patchValue({ Ingredients: this.selectedIngredients });
    console.log(this.formGroup.value);

    if (this.selectedId) {
      this.formGroup.patchValue({ photoUrl: this.dishImage });
      this.formGroup.patchValue({ Ingredients: this.selectedIngredients });

      this.dishService
        .updateDish(this.selectedId, this.formGroup.value)
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
    this.formGroup.patchValue({ photoUrl: this.dishImage });
    this.dishService.addDish(this.formGroup.value).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Added',
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

  addIngredient() {
    if (!this.selectedIngredients) {
      this.selectedIngredients = [];
    }
    console.log(this.ingredientGoup.value);
    let ingredient = {
      id: this.ingredientGoup.value.ingredient.id,
      name: this.ingredientGoup.value.ingredient.name,
      quantity: this.ingredientGoup.value.quantity,
    };
    this.selectedIngredients.push(ingredient);
    this.ingredientGoup.reset();
  }

  removeIngredient(Ingredient: SelectedIngredients) {
    this.selectedIngredients = this.selectedIngredients.filter(
      (item) => item !== Ingredient
    );
  }

  ngOnInit() {
    this.ingredientsService.getInventoryList().subscribe((data) => {
      this.ingredients = data;
    });

    this.formGroup = new FormGroup({
      price: new FormControl<number | null>(null),
      name: new FormControl<string | null>(null),
      description: new FormControl<string | null>(null),
      Ingredients: new FormControl<SelectedIngredients[]>([]),
    });

    this.ingredientGoup = new FormGroup({
      ingredient: new FormControl<string | null>(null),
      quantity: new FormControl<number | null>(null),
    });
  }

  filterIngredients(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.ingredients as any[]).length; i++) {
      let ingredient = (this.ingredients as any[])[i];
      if (ingredient.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(ingredient);
      }
    }
    this.filteredIngredients = filtered;
  }
}
