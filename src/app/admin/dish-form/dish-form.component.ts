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
import { Inject } from '@angular/core';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

interface City {
  name: string;
  code: string;
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
  cities!: City[];
  selectedCities!: City[];
  formGroup!: FormGroup;
  dishImage!: any;
  selectedId!: number;

  onUpload(event: any) {
    this.dishImage = event.files[0];
    console.log(event);
  }
  getDishesTest() {
    console.log(this.dishService.getDishes());
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
    console.log(this.formGroup.value);
  }

  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
    this.formGroup = new FormGroup({
      price: new FormControl<number | null>(null),
      name: new FormControl<string | null>(null),
      description: new FormControl<City[]>([]),
      Ingredients: new FormControl<City[]>([]),
    });
  }
}
