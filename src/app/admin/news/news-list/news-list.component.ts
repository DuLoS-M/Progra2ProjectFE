import { Component } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { News } from '../../../shared/types/types';
import { NewsService } from '../../../shared/service/news.service';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [DataViewModule, ButtonModule, CommonModule, RouterLink],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss',
})
export class NewsListComponent {
  news!: News[];

  constructor(private newsService: NewsService) {}

  deleteNews(id: number) {
    this.newsService.deleteNews(id).subscribe(() => {
      this.news = this.news.filter((news) => news.id !== id);
    });
  }

  ngOnInit() {
    this.newsService.getNewsList().subscribe((data) => {
      this.news = data;
      console.log('news:', this.news);
    });
  }
}
