import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng/primeng';
import { DataGrid } from 'primeng/primeng';

import { ArticleTableComponent } from './article-table.component';

import { ArticleService } from '../service/article.service';
import { Article } from '../model/article.model';



@Component({
    selector: 'app',
    template: `
        <div class="container">
            <div class="ui-grid">
                <div class="ui-grid-row">
                    <div class="ui-grid-col-2">Name:</div>
                    <div class="ui-grid-col-2">{{selectedArticle.name}}</div>
                </div>
                <div class="ui-grid-row">
                    <div class="ui-grid-col-2">PZN:</div>
                    <div class="ui-grid-col-2">{{selectedArticle.pzn}}</div>
                </div>
            </div>
            <article-table 
                [articles]="sliceAndCount.articles"
                [totalRecords]="sliceAndCount.count"
                (onLazyLoadArticles)="lazyLoadArticles($event)"
                (onRowSelectEmitter)="setSelectedArticle($event)">
            </article-table>
        </div>
              `,
    directives: [ArticleTableComponent], 
    providers: [ArticleService]
})
export class AppComponent 
{ 
    sliceAndCount = {
        articles: [],
        count: 0
    };

    selectedArticle: Article = new Article();

    constructor(private articleService: ArticleService) { 
    }

    lazyLoadArticles(event: LazyLoadEvent) {
        this.articleService.getArticlesSlice(event.first, event.rows, event.sortField, event.sortOrder)
                        .then(sliceAndCount => this.sliceAndCount = sliceAndCount);
    }

    setSelectedArticle(article) {
        this.selectedArticle = article;
    }

}
