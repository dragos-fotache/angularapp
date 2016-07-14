import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng/primeng';

import { ArticleTableComponent } from './article-table.component';

import { ArticleService } from '../service/article.service';
import { Article } from '../model/article.model';



@Component({
    selector: 'app',
    template: `
        <div class="container">
            <article-table 
                [articles]="articles"
                (onLazyLoadArticles)="lazyLoadArticles($event)">
            </article-table>
        </div>
              `,
    directives: [ArticleTableComponent], 
    providers: [ArticleService]
})
export class AppComponent 
// implements OnInit 
{ 

    articles: Article[];

    constructor(private articleService: ArticleService) { 
    }

    // ngOnInit() {
    //     this.articleService.getArticles().then(articles => this.articles = articles);
    // }

    lazyLoadArticles(event: LazyLoadEvent) {
        console.log(event.first, event.rows, event.sortField, event.sortOrder);
        this.articleService.getArticlesSlice(event.first, event.rows, event.sortField, event.sortOrder).then(articles => this.articles = articles);
    }

}
