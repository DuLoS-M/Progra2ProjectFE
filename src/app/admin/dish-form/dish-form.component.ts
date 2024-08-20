import { Component } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { FileUploadModule } from 'primeng/fileupload';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

interface City {
    name: string,
    code: string
}

@Component({
  selector: 'app-dish-form',
  standalone: true,
  imports: [
    InputNumberModule,
    InputTextareaModule,
    MultiSelectModule,
    RouterLink,
    FileUploadModule,
    ToastModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [MessageService],
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.scss'] 
})
export class DishFormComponent {
    constructor(private messageService: MessageService) {}
    cities!: City[];
    selectedCities!: City[];
    formGroup!: FormGroup;


    onUpload(event: any) {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    }

    ngOnInit() {
        this.cities = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
        ];
        this.formGroup = new FormGroup({
            value: new FormControl<string | null>(null),
            description: new FormControl<string | null>(null),
            selectedCities: new FormControl<City[]>([]),
        });
    }

}