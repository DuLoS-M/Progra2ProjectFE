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
import { NewsService } from '../../../shared/service/news.service';
import { News } from '../../../shared/types/types';
import { switchMap } from 'rxjs';

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
    RouterLink,
  ],
  providers: [MessageService],
  templateUrl: './news-form.component.html',
  styleUrl: './news-form.component.scss',
})
export class NewsFormComponent {
  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}
  newsService: NewsService = inject(NewsService);
  formGroup!: FormGroup;
  newsImage!: any;
  selectedId!: number;

  onUpload(event: any) {
    this.newsImage = event.files[0];
    console.log(this.newsImage);
  }

  onSubmit() {
    if (this.newsImage === undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please select an image',
      });
      return;
    }

    if (this.selectedId) {
      this.formGroup.patchValue({ photoUrl: this.newsImage });
      this.newsService
        .updateNews(this.selectedId, this.formGroup.value)
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
    this.formGroup.patchValue({ photoUrl: this.newsImage });
    this.newsService.addNews(this.formGroup.value).subscribe(
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

  ngOnInit() {
    this.formGroup = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      photoUrl: new FormControl(''),
    });

    this.route.paramMap
      .pipe(
        switchMap((params: any): any => {
          this.selectedId = Number(params.get('id'));
          return this.newsService.getNews(this.selectedId);
        })
      )
      .subscribe(
        (news: any) => {
          console.log({ news });
          this.formGroup.patchValue({ photoUrl: news.photoUrl });
          this.formGroup.patchValue(news);
          this.newsImage = { objectURL: news.photoUrl, name: news.title };
        },
        (error) => {
          console.error('Error fetching ingredient:', error);
        }
      );
  }
}
