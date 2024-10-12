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
import { switchMap } from 'rxjs';

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
  selectedIngredients: SelectedIngredients[] = [];

  onUpload(event: any): void {
    this.dishImage = event.files[0];
    console.log('File uploaded:', this.dishImage);
  }

  onSelect(event: any): void {
    this.dishImage = event.files[0];
    console.log('File selected:', this.dishImage);
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

    this.formGroup.patchValue({ ingredients: this.selectedIngredients });

    if (this.selectedId) {
      this.formGroup.patchValue({ photoUrl: this.dishImage });

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

    console.log(this.selectedIngredients);
    this.formGroup.patchValue({ photoUrl: this.dishImage });
    console.log(this.formGroup.value);
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
      ingredients: new FormControl<SelectedIngredients[]>([]),
      photoUrl: new FormControl<File | null>(null),
    });

    this.ingredientGoup = new FormGroup({
      ingredient: new FormControl<Ingredient | null>(null),
      quantity: new FormControl<number | null>(null),
    });

    this.route.paramMap
      .pipe(
        switchMap((params: any): any => {
          this.selectedId = Number(params.get('id'));
          return this.dishService.getDish(this.selectedId);
        })
      )
      .subscribe(
        (dish: any) => {
          console.log({ dish });
          this.formGroup.patchValue({ photoUrl: dish.photoUrl });
          this.formGroup.patchValue(dish);
          this.dishImage = { objectURL: dish.photoUrl, name: dish.title };
          this.selectedIngredients = dish.dishIngredients.map((item: any) => {
            return {
              id: item.ingredient.id,
              name: item.ingredient.name,
              quantity: item.quantityRequired,
            };
          });
        },
        (error) => {
          console.error('Error fetching ingredient:', error);
        }
      );
  }

  filterIngredients(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.ingredients.length; i++) {
      let ingredient = this.ingredients[i];
      if (ingredient.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(ingredient);
      }
    }
    this.filteredIngredients = filtered;
  }
}
