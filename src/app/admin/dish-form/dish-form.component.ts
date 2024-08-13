import { Component } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-dish-form',
  standalone: true,
  imports: [InputNumberModule,
    InputTextareaModule,
    MultiSelectModule, 
    FileUploadModule,
    FormsModule
  ],
  templateUrl: './dish-form.component.html',
  styleUrl: './dish-form.component.scss'
})
export class DishFormComponent {
  value1!: number;
  text1!: string;
  selectedCities1!: any[];

  value!: number;
  cities: any[] = [
    { label: 'New York', value: 'NY' },
    { label: 'Rome', value: 'RM' },
    { label: 'London', value: 'LDN' },
    { label: 'Istanbul', value: 'IST' },
    { label: 'Paris', value: 'PRS' }
  ];
  selectedCities!: any[];

  onUpload(event: any) {
    // Handle the file upload event
    console.log('File uploaded:', event);
  }
}
